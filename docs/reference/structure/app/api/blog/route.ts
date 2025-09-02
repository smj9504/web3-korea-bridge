import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { blogPostSchema } from '@/lib/validations';
import { z } from 'zod';

// GET /api/blog - List blog posts with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const tag = searchParams.get('tag') || '';
    const featured = searchParams.get('featured') === 'true';
    const status = searchParams.get('status') as 'PUBLISHED' | 'DRAFT' | null;

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_PARAMS', message: 'Invalid pagination parameters' } },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      status: status || 'PUBLISHED',
    };

    if (search) {
      where.OR = [
        {
          title: {
            path: ['en'],
            string_contains: search,
          },
        },
        {
          title: {
            path: ['ko'],
            string_contains: search,
          },
        },
        {
          content: {
            path: ['en'],
            string_contains: search,
          },
        },
        {
          content: {
            path: ['ko'],
            string_contains: search,
          },
        },
      ];
    }

    if (category) {
      where.categories = {
        some: {
          slug: category,
        },
      };
    }

    if (tag) {
      where.tags = {
        some: {
          slug: tag,
        },
      };
    }

    if (featured) {
      where.featured = true;
    }

    // Get posts with relations
    const [posts, totalCount] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
          categories: {
            select: {
              id: true,
              name: true,
              slug: true,
              color: true,
            },
          },
          tags: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        orderBy: {
          publishedAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch blog posts',
        },
      },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create a new blog post (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'You must be an admin or editor to create blog posts',
          },
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate request body
    const validationResult = blogPostSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: validationResult.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const { title, content, slug, excerpt, coverImage, published, tags, categoryIds } = validationResult.data;

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'SLUG_EXISTS',
            message: 'A post with this slug already exists',
          },
        },
        { status: 409 }
      );
    }

    // Create the post
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        excerpt,
        slug,
        coverImage,
        status: published ? 'PUBLISHED' : 'DRAFT',
        publishedAt: published ? new Date() : null,
        authorId: session.user.id,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
        tags: {
          connectOrCreate: tags.map((tagName) => ({
            where: { slug: tagName.toLowerCase().replace(/\s+/g, '-') },
            create: {
              name: { en: tagName, ko: tagName },
              slug: tagName.toLowerCase().replace(/\s+/g, '-'),
            },
          })),
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        categories: true,
        tags: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newPost,
        message: 'Blog post created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: error.issues,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to create blog post',
        },
      },
      { status: 500 }
    );
  }
}