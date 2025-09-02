#!/bin/bash

# Web3-Korea Bridge Monitoring Script
# Usage: ./scripts/monitor.sh [--notify] [--verbose]
# Options:
#   --notify: Send notifications on failures
#   --verbose: Show detailed output

set -e

# Configuration
PROJECT_NAME="Web3-Korea Bridge"
ENDPOINTS=(
  "https://web3korea.com"
  "https://web3korea.com/api/health"
  "https://web3korea.com/ko"
  "https://www.web3korea.com"
)

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Flags
NOTIFY=false
VERBOSE=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --notify)
      NOTIFY=true
      shift
      ;;
    --verbose)
      VERBOSE=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Helper functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_verbose() {
    if [ "$VERBOSE" = true ]; then
        echo -e "${YELLOW}[VERBOSE]${NC} $1"
    fi
}

# Send notification (placeholder - implement with your preferred service)
send_notification() {
    local message="$1"
    local severity="$2"
    
    if [ "$NOTIFY" = true ]; then
        log_verbose "Sending $severity notification: $message"
        
        # Webhook notification (replace with your webhook URL)
        if [ -n "${SLACK_WEBHOOK_URL:-}" ]; then
            curl -X POST "$SLACK_WEBHOOK_URL" \
                -H 'Content-type: application/json' \
                --data "{\"text\":\"🚨 $PROJECT_NAME Alert: $message\"}" \
                --silent > /dev/null || true
        fi
        
        # Email notification (replace with your email service)
        if [ -n "${NOTIFICATION_EMAIL:-}" ]; then
            echo "$message" | mail -s "[$PROJECT_NAME] $severity Alert" "$NOTIFICATION_EMAIL" || true
        fi
    fi
}

# Check endpoint health
check_endpoint() {
    local url="$1"
    local timeout=10
    local max_retries=3
    
    log_verbose "Checking endpoint: $url"
    
    for ((i=1; i<=max_retries; i++)); do
        response=$(curl -s -o /dev/null -w "%{http_code}:%{time_total}" --max-time $timeout "$url" 2>/dev/null || echo "000:0")
        
        http_code=$(echo "$response" | cut -d':' -f1)
        response_time=$(echo "$response" | cut -d':' -f2)
        
        if [ "$http_code" = "200" ]; then
            log_info "✅ $url (${http_code}, ${response_time}s)"
            return 0
        elif [ $i -lt $max_retries ]; then
            log_verbose "Retry $i/$max_retries for $url"
            sleep 2
        fi
    done
    
    log_error "❌ $url (${http_code}, ${response_time}s)"
    send_notification "$url returned $http_code after $max_retries retries" "ERROR"
    return 1
}

# Check SSL certificate
check_ssl() {
    local domain="$1"
    local expiry_threshold=7 # days
    
    log_verbose "Checking SSL certificate for $domain"
    
    expiry_date=$(echo | openssl s_client -servername "$domain" -connect "$domain:443" 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
    
    if [ -n "$expiry_date" ]; then
        expiry_epoch=$(date -d "$expiry_date" +%s)
        current_epoch=$(date +%s)
        days_until_expiry=$(( (expiry_epoch - current_epoch) / 86400 ))
        
        if [ $days_until_expiry -le $expiry_threshold ]; then
            log_warning "🔒 SSL certificate for $domain expires in $days_until_expiry days"
            send_notification "SSL certificate for $domain expires in $days_until_expiry days" "WARNING"
        else
            log_info "🔒 SSL certificate for $domain is valid ($days_until_expiry days remaining)"
        fi
    else
        log_error "🔒 Could not check SSL certificate for $domain"
        send_notification "Could not check SSL certificate for $domain" "ERROR"
    fi
}

# Check database connectivity
check_database() {
    log_verbose "Checking database connectivity"
    
    if [ -n "${DATABASE_URL:-}" ]; then
        if npx prisma db execute --stdin <<< "SELECT 1;" > /dev/null 2>&1; then
            log_info "🗄️  Database connection successful"
        else
            log_error "🗄️  Database connection failed"
            send_notification "Database connection failed" "CRITICAL"
            return 1
        fi
    else
        log_warning "🗄️  DATABASE_URL not set, skipping database check"
    fi
}

# Check external services
check_external_services() {
    local services=(
        "https://api.vercel.com/v1/user:Vercel API"
        "https://api.planetscale.com/v1/organizations:PlanetScale API"
        "https://api.resend.com/domains:Resend API"
    )
    
    log_verbose "Checking external services"
    
    for service_info in "${services[@]}"; do
        IFS=':' read -r url name <<< "$service_info"
        
        if curl -s --max-time 5 "$url" > /dev/null 2>&1; then
            log_info "🔗 $name is accessible"
        else
            log_warning "🔗 $name is not accessible"
        fi
    done
}

# Performance check
check_performance() {
    local url="$1"
    local max_response_time=3.0
    
    log_verbose "Checking performance for $url"
    
    response_time=$(curl -s -o /dev/null -w "%{time_total}" --max-time 10 "$url" 2>/dev/null || echo "999")
    
    if (( $(echo "$response_time < $max_response_time" | bc -l) )); then
        log_info "⚡ Performance OK for $url (${response_time}s)"
    else
        log_warning "⚡ Slow response from $url (${response_time}s)"
        send_notification "$url response time is ${response_time}s (threshold: ${max_response_time}s)" "WARNING"
    fi
}

# Generate monitoring report
generate_report() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local report_file="monitoring-report-$(date +%Y%m%d-%H%M%S).txt"
    
    {
        echo "================================================"
        echo "$PROJECT_NAME - Monitoring Report"
        echo "================================================"
        echo "Timestamp: $timestamp"
        echo "Environment: ${NODE_ENV:-production}"
        echo ""
        echo "Endpoints Checked:"
        for endpoint in "${ENDPOINTS[@]}"; do
            echo "  - $endpoint"
        done
        echo ""
        echo "Report generated by: $0"
        echo "================================================"
    } > "$report_file"
    
    log_info "📊 Monitoring report saved to: $report_file"
}

# Main monitoring function
main() {
    local failed_checks=0
    local total_checks=0
    
    log_info "🔍 Starting monitoring checks for $PROJECT_NAME..."
    log_info "Timestamp: $(date)"
    echo ""
    
    # Check all endpoints
    for endpoint in "${ENDPOINTS[@]}"; do
        ((total_checks++))
        if ! check_endpoint "$endpoint"; then
            ((failed_checks++))
        fi
        
        # Performance check for main endpoints
        if [[ "$endpoint" == "https://web3korea.com"* ]]; then
            check_performance "$endpoint"
        fi
    done
    
    echo ""
    
    # SSL certificate checks
    check_ssl "web3korea.com"
    check_ssl "www.web3korea.com"
    
    # Database connectivity
    check_database
    
    # External services
    check_external_services
    
    echo ""
    echo "================================================"
    echo "Monitoring Summary"
    echo "================================================"
    log_info "Total endpoints checked: $total_checks"
    
    if [ $failed_checks -eq 0 ]; then
        log_info "✅ All checks passed!"
    else
        log_error "❌ $failed_checks out of $total_checks checks failed"
        send_notification "$failed_checks out of $total_checks monitoring checks failed" "CRITICAL"
    fi
    
    echo "Completed: $(date)"
    
    # Generate report if verbose
    if [ "$VERBOSE" = true ]; then
        generate_report
    fi
    
    echo "================================================"
    
    return $failed_checks
}

# Run monitoring
main