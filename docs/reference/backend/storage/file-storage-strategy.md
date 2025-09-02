# File Storage Strategy for Image Uploads

## Overview
Multi-tier storage strategy with cloud CDN, local development support, and automatic image optimization.

## Storage Providers (Priority Order)

### 1. Primary: Cloudflare R2 + Images
```typescript
const cloudflareConfig = {
  provider: 'cloudflare-r2',
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  bucketName: process.env.CLOUDFLARE_R2_BUCKET_NAME,
  publicUrl: process.env.CLOUDFLARE_R2_PUBLIC_URL,
  features: {
    cdn: true,
    imageTransform: true, // Cloudflare Images
    webp: true,
    autoOptimization: true,
    variants: ['thumbnail', 'medium', 'large', 'webp']
  },
  pricing: 'Very competitive, $0.015/GB storage, free egress'
};
```

### 2. Fallback: AWS S3 + CloudFront
```typescript
const awsConfig = {
  provider: 'aws-s3',
  region: process.env.AWS_REGION || 'ap-northeast-1',
  bucket: process.env.AWS_S3_BUCKET,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  cloudFrontUrl: process.env.AWS_CLOUDFRONT_URL,
  features: {
    cdn: true,
    imageTransform: false, // Would need Lambda@Edge
    webp: false, // Custom solution needed
    autoOptimization: false
  }
};
```

### 3. Development: Local File System
```typescript
const localConfig = {
  provider: 'local',
  uploadDir: './public/uploads',
  publicPath: '/uploads',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
};
```

## File Upload Architecture

### Upload Flow
```
1. Client uploads file to /api/admin/media/upload
2. Validate file type, size, and admin authentication
3. Process image (resize, optimize, generate variants)
4. Upload to primary storage (Cloudflare R2)
5. Save metadata to database
6. Return upload result with URLs
```

### File Structure
```
uploads/
├── blog/
│   ├── 2024/
│   │   ├── 01/
│   │   │   ├── original/
│   │   │   ├── thumbnails/
│   │   │   ├── medium/
│   │   │   └── webp/
│   │   └── 02/
│   └── 2025/
├── portfolio/
│   ├── 2024/
│   └── 2025/
├── static/
│   ├── hero/
│   ├── about/
│   └── services/
└── temp/
    └── [cleanup after 24h]
```

## Image Processing Service

### Sharp Configuration
```typescript
// lib/image/ImageProcessor.ts
import sharp from 'sharp';
import path from 'path';

export class ImageProcessor {
  private readonly variants = {
    thumbnail: { width: 300, height: 200, quality: 80 },
    medium: { width: 800, height: 600, quality: 85 },
    large: { width: 1200, height: 900, quality: 90 },
    hero: { width: 1920, height: 1080, quality: 95 }
  };

  async processImage(buffer: Buffer, filename: string): Promise<ProcessedImage> {
    const ext = path.extname(filename).toLowerCase();
    const baseName = path.basename(filename, ext);
    const timestamp = Date.now();
    
    const results: ProcessedImage = {
      original: null,
      variants: {},
      metadata: {}
    };

    try {
      // Get image metadata
      const metadata = await sharp(buffer).metadata();
      results.metadata = {
        width: metadata.width || 0,
        height: metadata.height || 0,
        format: metadata.format || '',
        size: buffer.length,
        hasAlpha: metadata.hasAlpha || false
      };

      // Process original (optimize but keep dimensions)
      const originalBuffer = await sharp(buffer)
        .jpeg({ quality: 95, progressive: true })
        .png({ compressionLevel: 6, progressive: true })
        .webp({ quality: 95 })
        .toBuffer({ resolveWithObject: true });

      results.original = {
        buffer: originalBuffer.data,
        filename: `${baseName}-${timestamp}-original${this.getExtension(originalBuffer.info.format)}`,
        size: originalBuffer.data.length,
        format: originalBuffer.info.format,
        width: originalBuffer.info.width,
        height: originalBuffer.info.height
      };

      // Generate variants
      for (const [variantName, config] of Object.entries(this.variants)) {
        const variantBuffer = await sharp(buffer)
          .resize({
            width: config.width,
            height: config.height,
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: config.quality, progressive: true })
          .toBuffer({ resolveWithObject: true });

        results.variants[variantName] = {
          buffer: variantBuffer.data,
          filename: `${baseName}-${timestamp}-${variantName}.jpg`,
          size: variantBuffer.data.length,
          format: 'jpeg',
          width: variantBuffer.info.width,
          height: variantBuffer.info.height
        };

        // Also generate WebP variant
        const webpBuffer = await sharp(buffer)
          .resize({
            width: config.width,
            height: config.height,
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: config.quality })
          .toBuffer({ resolveWithObject: true });

        results.variants[`${variantName}_webp`] = {
          buffer: webpBuffer.data,
          filename: `${baseName}-${timestamp}-${variantName}.webp`,
          size: webpBuffer.data.length,
          format: 'webp',
          width: webpBuffer.info.width,
          height: webpBuffer.info.height
        };
      }

      return results;
    } catch (error) {
      console.error('Image processing error:', error);
      throw new Error('Failed to process image');
    }
  }

  private getExtension(format: string): string {
    switch (format) {
      case 'jpeg': return '.jpg';
      case 'png': return '.png';
      case 'webp': return '.webp';
      case 'gif': return '.gif';
      default: return '.jpg';
    }
  }
}
```

### Storage Service
```typescript
// lib/storage/StorageService.ts
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { ImageProcessor } from '../image/ImageProcessor';
import { connectDB } from '../db';

export class StorageService {
  private s3Client: S3Client;
  private imageProcessor: ImageProcessor;
  private bucket: string;
  private publicUrl: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.CLOUDFLARE_R2_REGION || 'auto',
      endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!
      }
    });
    
    this.imageProcessor = new ImageProcessor();
    this.bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME!;
    this.publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL!;
  }

  async uploadImage(
    file: File, 
    category: 'blog' | 'portfolio' | 'static', 
    adminId: number
  ): Promise<UploadResult> {
    try {
      // Validate file
      this.validateFile(file);

      // Convert File to Buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Process image
      const processed = await this.imageProcessor.processImage(buffer, file.name);
      
      // Generate storage paths
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const basePath = `${category}/${year}/${month}`;

      const uploadPromises: Promise<UploadedVariant>[] = [];

      // Upload original
      if (processed.original) {
        uploadPromises.push(
          this.uploadSingleFile(
            processed.original,
            `${basePath}/original/${processed.original.filename}`
          )
        );
      }

      // Upload variants
      for (const [variantName, variant] of Object.entries(processed.variants)) {
        const variantPath = variantName.endsWith('_webp') ? 'webp' : 'variants';
        uploadPromises.push(
          this.uploadSingleFile(
            variant,
            `${basePath}/${variantPath}/${variant.filename}`
          )
        );
      }

      // Wait for all uploads to complete
      const uploadedFiles = await Promise.all(uploadPromises);

      // Save to database
      const db = await connectDB();
      const result = await db.query(
        `INSERT INTO uploads 
         (filename, original_name, mime_type, size_bytes, storage_path, storage_url, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id`,
        [
          processed.original?.filename || file.name,
          file.name,
          file.type,
          processed.original?.size || buffer.length,
          uploadedFiles[0].path,
          uploadedFiles[0].url,
          adminId
        ]
      );

      const uploadId = result.rows[0].id;

      // Save variant information
      for (const uploaded of uploadedFiles) {
        await db.query(
          `INSERT INTO upload_variants (upload_id, variant_name, filename, path, url, width, height, size_bytes)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            uploadId,
            uploaded.variant,
            uploaded.filename,
            uploaded.path,
            uploaded.url,
            uploaded.width,
            uploaded.height,
            uploaded.size
          ]
        );
      }

      return {
        id: uploadId,
        filename: processed.original?.filename || file.name,
        originalName: file.name,
        urls: {
          original: uploadedFiles.find(u => u.variant === 'original')?.url || '',
          thumbnail: uploadedFiles.find(u => u.variant === 'thumbnail')?.url || '',
          medium: uploadedFiles.find(u => u.variant === 'medium')?.url || '',
          large: uploadedFiles.find(u => u.variant === 'large')?.url || '',
          webp: uploadedFiles.filter(u => u.variant.endsWith('_webp')).map(u => ({
            variant: u.variant.replace('_webp', ''),
            url: u.url
          }))
        },
        metadata: processed.metadata
      };

    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  private async uploadSingleFile(
    fileData: ProcessedImageVariant,
    path: string
  ): Promise<UploadedVariant> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: path,
      Body: fileData.buffer,
      ContentType: `image/${fileData.format}`,
      CacheControl: 'public, max-age=31536000', // 1 year
      Metadata: {
        originalName: fileData.filename,
        uploadedAt: new Date().toISOString()
      }
    });

    await this.s3Client.send(command);

    const url = `${this.publicUrl}/${path}`;
    const variant = this.getVariantName(path);

    return {
      variant,
      filename: fileData.filename,
      path,
      url,
      width: fileData.width,
      height: fileData.height,
      size: fileData.size
    };
  }

  private validateFile(file: File): void {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    if (file.size > maxSize) {
      throw new Error('File size exceeds 10MB limit');
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed');
    }
  }

  private getVariantName(path: string): string {
    if (path.includes('/original/')) return 'original';
    if (path.includes('/webp/')) {
      const filename = path.split('/').pop() || '';
      if (filename.includes('-thumbnail.')) return 'thumbnail_webp';
      if (filename.includes('-medium.')) return 'medium_webp';
      if (filename.includes('-large.')) return 'large_webp';
      if (filename.includes('-hero.')) return 'hero_webp';
    }
    if (path.includes('/variants/')) {
      const filename = path.split('/').pop() || '';
      if (filename.includes('-thumbnail.')) return 'thumbnail';
      if (filename.includes('-medium.')) return 'medium';
      if (filename.includes('-large.')) return 'large';
      if (filename.includes('-hero.')) return 'hero';
    }
    return 'unknown';
  }

  async deleteImage(uploadId: number): Promise<void> {
    const db = await connectDB();
    
    // Get all variants to delete
    const variants = await db.query(
      'SELECT path FROM upload_variants WHERE upload_id = $1',
      [uploadId]
    );

    // Get original file path
    const original = await db.query(
      'SELECT storage_path FROM uploads WHERE id = $1',
      [uploadId]
    );

    // Delete from storage
    const pathsToDelete = [
      original.rows[0]?.storage_path,
      ...variants.rows.map(v => v.path)
    ].filter(Boolean);

    for (const path of pathsToDelete) {
      try {
        const command = new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: path
        });
        await this.s3Client.send(command);
      } catch (error) {
        console.error(`Failed to delete ${path}:`, error);
      }
    }

    // Delete from database
    await db.query('DELETE FROM uploads WHERE id = $1', [uploadId]);
  }
}
```

## Upload API Implementation

```typescript
// app/api/admin/media/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { StorageService } from '@/lib/storage/StorageService';
import { authMiddleware } from '@/lib/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json(authResult, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string || 'static';
    
    if (!file) {
      return NextResponse.json({
        success: false,
        error: { code: 'NO_FILE', message: 'No file provided' }
      }, { status: 400 });
    }

    const storageService = new StorageService();
    const uploadResult = await storageService.uploadImage(
      file, 
      category as 'blog' | 'portfolio' | 'static',
      authResult.userId
    );

    return NextResponse.json({
      success: true,
      data: uploadResult
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'UPLOAD_FAILED',
        message: error instanceof Error ? error.message : 'Upload failed'
      }
    }, { status: 500 });
  }
}
```

## Additional Database Schema

```sql
-- Upload variants table for storing different image sizes
CREATE TABLE upload_variants (
    id SERIAL PRIMARY KEY,
    upload_id INTEGER REFERENCES uploads(id) ON DELETE CASCADE,
    variant_name VARCHAR(50) NOT NULL, -- original, thumbnail, medium, large, webp
    filename VARCHAR(255) NOT NULL,
    path VARCHAR(500) NOT NULL,
    url VARCHAR(500) NOT NULL,
    width INTEGER,
    height INTEGER,
    size_bytes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_upload_variants_upload_id ON upload_variants(upload_id);
CREATE INDEX idx_upload_variants_variant ON upload_variants(variant_name);
```

## Environment Variables

```bash
# Cloudflare R2 Configuration (Primary)
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key_id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
CLOUDFLARE_R2_BUCKET_NAME=web3-korea-bridge-media
CLOUDFLARE_R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
CLOUDFLARE_R2_PUBLIC_URL=https://media.web3-korea-bridge.com
CLOUDFLARE_R2_REGION=auto

# AWS S3 Configuration (Fallback)
AWS_REGION=ap-northeast-1
AWS_S3_BUCKET=web3-korea-bridge-backup
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_CLOUDFRONT_URL=https://your-cloudfront-distribution.cloudfront.net

# Upload Configuration
MAX_FILE_SIZE_MB=10
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif
```

## CDN Configuration

### Cloudflare R2 Custom Domain Setup
```
1. Create R2 bucket: web3-korea-bridge-media
2. Set up custom domain: media.web3-korea-bridge.com
3. Configure DNS CNAME: media.web3-korea-bridge.com → your-bucket.r2.cloudflarestorage.com
4. Enable Cloudflare Images for automatic optimization
5. Set cache rules: Cache everything for 1 year (31536000 seconds)
```

### Image Optimization Rules
```typescript
const imageOptimizationRules = {
  // Automatic WebP conversion for supported browsers
  webpConversion: true,
  
  // Quality settings by variant
  quality: {
    thumbnail: 80,
    medium: 85,
    large: 90,
    original: 95
  },
  
  // Progressive JPEG for better loading experience
  progressive: true,
  
  // Cache control headers
  cacheControl: 'public, max-age=31536000, immutable'
};
```