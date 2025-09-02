# Backup and Recovery Strategy

## Overview
Comprehensive backup and disaster recovery plan ensuring 99.9% uptime with RTO ≤ 4 hours and RPO ≤ 1 hour.

## Backup Strategy (3-2-1 Rule)

### 3 Copies of Data
1. **Production Database** (Primary)
2. **Automated Daily Backups** (Secondary)  
3. **Off-site Cold Storage** (Tertiary)

### 2 Different Media Types
1. **Cloud Storage** (AWS S3, Cloudflare R2)
2. **Database Replicas** (Read replicas, standby instances)

### 1 Off-site Backup
- **Geographic Separation** (Different regions)
- **Air-gapped Storage** (Immutable backups)

## Database Backup Strategy

### Automated PostgreSQL Backups
```bash
#!/bin/bash
# backup-script.sh - Daily automated backup

# Configuration
DB_NAME="web3_korea_bridge"
DB_USER="postgres"
DB_HOST="localhost"
BACKUP_DIR="/var/backups/postgresql"
S3_BUCKET="web3-korea-bridge-backups"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Create backup directory
mkdir -p ${BACKUP_DIR}

# Full database dump with compression
pg_dump -h ${DB_HOST} -U ${DB_USER} -d ${DB_NAME} \
  --verbose --clean --no-owner --no-privileges \
  --format=custom --compress=9 \
  --file="${BACKUP_DIR}/${DB_NAME}_${DATE}.dump"

# Create SQL script backup (human readable)
pg_dump -h ${DB_HOST} -U ${DB_USER} -d ${DB_NAME} \
  --verbose --clean --no-owner --no-privileges \
  --format=plain \
  --file="${BACKUP_DIR}/${DB_NAME}_${DATE}.sql"

# Compress SQL backup
gzip "${BACKUP_DIR}/${DB_NAME}_${DATE}.sql"

# Upload to S3 (primary backup)
aws s3 cp "${BACKUP_DIR}/${DB_NAME}_${DATE}.dump" \
  "s3://${S3_BUCKET}/database/daily/${DATE}/" \
  --storage-class STANDARD_IA

aws s3 cp "${BACKUP_DIR}/${DB_NAME}_${DATE}.sql.gz" \
  "s3://${S3_BUCKET}/database/daily/${DATE}/" \
  --storage-class STANDARD_IA

# Upload to Cloudflare R2 (redundant backup)
aws s3 cp "${BACKUP_DIR}/${DB_NAME}_${DATE}.dump" \
  "s3://${R2_BUCKET}/database/daily/${DATE}/" \
  --endpoint-url ${R2_ENDPOINT}

# Clean local backups older than retention period
find ${BACKUP_DIR} -name "*.dump" -mtime +${RETENTION_DAYS} -delete
find ${BACKUP_DIR} -name "*.sql.gz" -mtime +${RETENTION_DAYS} -delete

# Log backup completion
echo "$(date): Backup completed successfully - ${DATE}" >> /var/log/backup.log
```

### Point-in-Time Recovery Setup
```sql
-- Enable Point-in-Time Recovery
-- postgresql.conf settings
wal_level = replica
archive_mode = on
archive_command = 'aws s3 cp %p s3://web3-korea-bridge-wal/%f'
max_wal_senders = 3
checkpoint_completion_target = 0.7
wal_compression = on
```

### Database Replication Configuration
```yaml
# Master-Replica Setup
master_database:
  host: db-master.web3-korea-bridge.com
  port: 5432
  ssl_mode: require
  replication_role: master
  
replica_database:
  host: db-replica.web3-korea-bridge.com
  port: 5432
  ssl_mode: require
  replication_role: replica
  lag_tolerance: 1000ms # 1 second
  
failover:
  automatic: true
  timeout: 30s
  health_check_interval: 10s
```

## File Storage Backup

### Media Files Backup Strategy
```typescript
// lib/backup/FileBackup.ts
import { S3Client, ListObjectsV2Command, CopyObjectCommand } from '@aws-sdk/client-s3';

export class FileBackupService {
  private primaryS3: S3Client;
  private backupS3: S3Client;
  private r2Client: S3Client;

  constructor() {
    // Primary storage (Cloudflare R2)
    this.primaryS3 = new S3Client({
      region: 'auto',
      endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!
      }
    });

    // Backup storage (AWS S3)
    this.backupS3 = new S3Client({
      region: process.env.AWS_REGION || 'ap-northeast-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    });
  }

  async syncToBackup(): Promise<void> {
    try {
      const objects = await this.listAllObjects();
      
      for (const obj of objects) {
        await this.copyToBackup(obj.Key!);
      }
      
      console.log(`Synced ${objects.length} files to backup storage`);
    } catch (error) {
      console.error('File backup sync failed:', error);
      throw error;
    }
  }

  private async listAllObjects() {
    const objects: any[] = [];
    let continuationToken: string | undefined;

    do {
      const command = new ListObjectsV2Command({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
        ContinuationToken: continuationToken
      });

      const response = await this.primaryS3.send(command);
      
      if (response.Contents) {
        objects.push(...response.Contents);
      }
      
      continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    return objects;
  }

  private async copyToBackup(key: string): Promise<void> {
    // Implementation would involve downloading from R2 and uploading to S3
    // This is simplified - in production, use direct transfer where possible
  }
}
```

### Automated File Backup Cron
```bash
#!/bin/bash
# file-backup.sh - Weekly file backup sync

# Sync media files from Cloudflare R2 to AWS S3
aws s3 sync s3://web3-korea-bridge-media/ s3://web3-korea-bridge-file-backup/ \
  --source-region auto \
  --endpoint-url ${CLOUDFLARE_R2_ENDPOINT} \
  --delete \
  --storage-class GLACIER

# Log sync completion
echo "$(date): File backup sync completed" >> /var/log/file-backup.log
```

## Application Code Backup

### Git Repository Backup
```yaml
# .github/workflows/backup-repository.yml
name: Repository Backup

on:
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Full history

      - name: Create backup archive
        run: |
          tar -czf web3-korea-bridge-$(date +%Y%m%d).tar.gz \
            --exclude='.git' \
            --exclude='node_modules' \
            --exclude='.next' \
            .

      - name: Upload to S3
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 cp web3-korea-bridge-$(date +%Y%m%d).tar.gz \
            s3://web3-korea-bridge-backups/code/$(date +%Y%m%d)/

      - name: Mirror to GitLab (Secondary Git Remote)
        run: |
          git remote add gitlab https://gitlab.com/web3-korea-bridge/backup.git
          git push gitlab --all
          git push gitlab --tags
```

## Disaster Recovery Procedures

### Recovery Time Objectives (RTO)
- **Critical Systems**: ≤ 1 hour
- **Database**: ≤ 2 hours  
- **Full Application**: ≤ 4 hours
- **File Storage**: ≤ 6 hours

### Recovery Point Objectives (RPO)
- **Database**: ≤ 1 hour (continuous WAL shipping)
- **Files**: ≤ 24 hours (daily sync)
- **Application Code**: ≤ 1 hour (Git commits)

### Database Recovery Procedures

#### 1. Point-in-Time Recovery
```bash
#!/bin/bash
# restore-database.sh
# Point-in-time database recovery

RESTORE_DATE="2024-01-15 14:30:00"
BACKUP_DATE="20240115"
BACKUP_FILE="web3_korea_bridge_${BACKUP_DATE}.dump"

# Step 1: Stop application
sudo systemctl stop web3-korea-bridge

# Step 2: Restore base backup
pg_restore -h localhost -U postgres -d web3_korea_bridge_restore \
  --clean --create --verbose \
  "/var/backups/postgresql/${BACKUP_FILE}"

# Step 3: Apply WAL files up to target time
# recovery.conf (PostgreSQL 11 and earlier) or postgresql.conf (12+)
echo "restore_command = 'aws s3 cp s3://web3-korea-bridge-wal/%f %p'" >> recovery.conf
echo "recovery_target_time = '${RESTORE_DATE}'" >> recovery.conf

# Step 4: Start PostgreSQL and verify
sudo systemctl start postgresql
sudo -u postgres psql -c "SELECT pg_is_in_recovery();"

# Step 5: Promote to primary and restart application
sudo -u postgres psql -c "SELECT pg_promote();"
sudo systemctl start web3-korea-bridge
```

#### 2. Failover to Replica
```bash
#!/bin/bash
# failover-to-replica.sh
# Automatic failover to database replica

# Step 1: Promote replica to primary
ssh db-replica.web3-korea-bridge.com "sudo -u postgres pg_ctl promote -D /var/lib/postgresql/data"

# Step 2: Update application config
sed -i 's/db-master.web3-korea-bridge.com/db-replica.web3-korea-bridge.com/g' /app/.env.production

# Step 3: Restart application
sudo systemctl restart web3-korea-bridge

# Step 4: Update DNS records (automated via API)
aws route53 change-resource-record-sets --hosted-zone-id Z123456789 \
  --change-batch file://dns-failover.json
```

### Application Recovery Procedures

#### Docker-based Recovery
```yaml
# docker-compose.recovery.yml
version: '3.8'
services:
  app:
    image: web3-korea-bridge:latest
    container_name: web3-korea-bridge-recovery
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db-backup:5432/web3_korea_bridge
      - REDIS_URL=redis://redis-backup:6379
    depends_on:
      - db-backup
      - redis-backup
    restart: unless-stopped

  db-backup:
    image: postgres:15
    container_name: postgres-backup
    environment:
      POSTGRES_DB: web3_korea_bridge
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - ./backup-data:/docker-entrypoint-initdb.d
      - postgres-backup-data:/var/lib/postgresql/data

  redis-backup:
    image: redis:7-alpine
    container_name: redis-backup
    command: redis-server --appendonly yes
    volumes:
      - redis-backup-data:/data

volumes:
  postgres-backup-data:
  redis-backup-data:
```

### Recovery Testing & Validation

#### Automated Recovery Testing
```typescript
// scripts/test-recovery.ts
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class RecoveryTester {
  async testDatabaseRecovery(): Promise<boolean> {
    try {
      // 1. Create test database from backup
      await execAsync(`
        createdb web3_korea_bridge_test
        pg_restore -d web3_korea_bridge_test /var/backups/postgresql/latest.dump
      `);

      // 2. Verify data integrity
      const { stdout } = await execAsync(`
        psql -d web3_korea_bridge_test -c "
          SELECT COUNT(*) FROM blog_posts;
          SELECT COUNT(*) FROM portfolio_projects;
          SELECT COUNT(*) FROM contact_inquiries;
        "
      `);

      // 3. Test application connectivity
      process.env.DATABASE_URL = 'postgresql://postgres@localhost:5432/web3_korea_bridge_test';
      const testResult = await this.testApplicationHealth();

      // 4. Cleanup
      await execAsync('dropdb web3_korea_bridge_test');

      return testResult;
    } catch (error) {
      console.error('Recovery test failed:', error);
      return false;
    }
  }

  private async testApplicationHealth(): Promise<boolean> {
    // Implementation would test critical application functions
    // Database connections, API endpoints, file access, etc.
    return true;
  }
}
```

## Monitoring & Alerting

### Backup Monitoring
```sql
-- Backup monitoring views
CREATE VIEW backup_status AS
SELECT 
  'database' as backup_type,
  MAX(created_at) as last_backup,
  EXTRACT(EPOCH FROM (NOW() - MAX(created_at)))/3600 as hours_since_backup,
  CASE 
    WHEN EXTRACT(EPOCH FROM (NOW() - MAX(created_at)))/3600 > 25 THEN 'ERROR'
    WHEN EXTRACT(EPOCH FROM (NOW() - MAX(created_at)))/3600 > 24 THEN 'WARNING'
    ELSE 'OK'
  END as status
FROM backup_log 
WHERE backup_type = 'database'

UNION ALL

SELECT 
  'files' as backup_type,
  MAX(created_at) as last_backup,
  EXTRACT(EPOCH FROM (NOW() - MAX(created_at)))/3600 as hours_since_backup,
  CASE 
    WHEN EXTRACT(EPOCH FROM (NOW() - MAX(created_at)))/3600 > 169 THEN 'ERROR' -- 7 days + 1 hour
    WHEN EXTRACT(EPOCH FROM (NOW() - MAX(created_at)))/3600 > 168 THEN 'WARNING' -- 7 days
    ELSE 'OK'
  END as status
FROM backup_log 
WHERE backup_type = 'files';

-- Backup log table
CREATE TABLE backup_log (
  id SERIAL PRIMARY KEY,
  backup_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL,
  size_bytes BIGINT,
  duration_seconds INTEGER,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Health Check API
```typescript
// app/api/health/backup/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    const db = await connectDB();
    
    const result = await db.query(`
      SELECT backup_type, status, hours_since_backup, last_backup
      FROM backup_status
    `);

    const backupStatus = result.rows.reduce((acc, row) => {
      acc[row.backup_type] = {
        status: row.status,
        lastBackup: row.last_backup,
        hoursSince: row.hours_since_backup
      };
      return acc;
    }, {});

    const overallStatus = Object.values(backupStatus).some(
      (backup: any) => backup.status === 'ERROR'
    ) ? 'ERROR' : 'OK';

    return NextResponse.json({
      status: overallStatus,
      backups: backupStatus,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      status: 'ERROR',
      error: 'Health check failed'
    }, { status: 500 });
  }
}
```

## Environment Variables

```bash
# Backup Configuration
AWS_S3_BACKUP_BUCKET=web3-korea-bridge-backups
CLOUDFLARE_R2_BACKUP_BUCKET=web3-korea-bridge-backup
BACKUP_RETENTION_DAYS=90
WAL_RETENTION_DAYS=7

# Recovery Configuration
RECOVERY_EMAIL=admin@web3-korea-bridge.com
ALERT_WEBHOOK_URL=https://hooks.slack.com/services/your/slack/webhook

# Database Configuration
DB_BACKUP_SCHEDULE="0 2 * * *"  # Daily at 2 AM
FILE_BACKUP_SCHEDULE="0 3 * * 0"  # Weekly on Sunday at 3 AM
RECOVERY_TEST_SCHEDULE="0 4 * * 1"  # Weekly on Monday at 4 AM
```

## Backup Schedule Summary

| Backup Type | Frequency | Retention | Storage Location |
|-------------|-----------|-----------|------------------|
| Database (Full) | Daily | 90 days | S3 + R2 + Local |
| Database (WAL) | Continuous | 7 days | S3 + R2 |
| Files (Sync) | Weekly | 365 days | S3 Glacier |
| Code Repository | Daily | Indefinite | GitLab + S3 |
| Recovery Test | Weekly | 30 days | Test environment |

This comprehensive backup and recovery strategy ensures business continuity with minimal data loss and rapid recovery capabilities.