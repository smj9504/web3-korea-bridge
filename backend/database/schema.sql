-- Web3-Korea Bridge Database Schema
-- PostgreSQL Database Design

-- ==========================================
-- CORE TABLES
-- ==========================================

-- Languages table for i18n support
CREATE TABLE languages (
    id SERIAL PRIMARY KEY,
    code VARCHAR(5) UNIQUE NOT NULL, -- 'en', 'ko', 'ja'
    name VARCHAR(50) NOT NULL,
    native_name VARCHAR(50) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Admin users table (single admin system)
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- File uploads table
CREATE TABLE uploads (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size_bytes INTEGER NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    storage_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    created_by INTEGER REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- CONTENT MANAGEMENT TABLES
-- ==========================================

-- Content categories for organization
CREATE TABLE content_categories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Localized content for categories
CREATE TABLE content_category_translations (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES content_categories(id) ON DELETE CASCADE,
    language_code VARCHAR(5) REFERENCES languages(code) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    UNIQUE(category_id, language_code)
);

-- Blog/News posts
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(200) UNIQUE NOT NULL,
    category_id INTEGER REFERENCES content_categories(id),
    featured_image_id INTEGER REFERENCES uploads(id),
    author_id INTEGER REFERENCES admin_users(id),
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
    is_featured BOOLEAN DEFAULT FALSE,
    views_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Localized blog post content
CREATE TABLE blog_post_translations (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
    language_code VARCHAR(5) REFERENCES languages(code) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    meta_title VARCHAR(200),
    meta_description TEXT,
    UNIQUE(post_id, language_code)
);

-- Portfolio categories
CREATE TABLE portfolio_categories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Localized portfolio category content
CREATE TABLE portfolio_category_translations (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES portfolio_categories(id) ON DELETE CASCADE,
    language_code VARCHAR(5) REFERENCES languages(code) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    UNIQUE(category_id, language_code)
);

-- Portfolio projects
CREATE TABLE portfolio_projects (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(200) UNIQUE NOT NULL,
    category_id INTEGER REFERENCES portfolio_categories(id),
    featured_image_id INTEGER REFERENCES uploads(id),
    project_url VARCHAR(500),
    github_url VARCHAR(500),
    client_name VARCHAR(100),
    completion_date DATE,
    status VARCHAR(20) DEFAULT 'active', -- active, archived, hidden
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    technologies JSONB, -- Array of technology names
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Localized portfolio project content
CREATE TABLE portfolio_project_translations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES portfolio_projects(id) ON DELETE CASCADE,
    language_code VARCHAR(5) REFERENCES languages(code) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    content TEXT,
    challenges TEXT,
    solutions TEXT,
    results TEXT,
    UNIQUE(project_id, language_code)
);

-- Portfolio project images
CREATE TABLE portfolio_project_images (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES portfolio_projects(id) ON DELETE CASCADE,
    image_id INTEGER REFERENCES uploads(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- STATIC CONTENT MANAGEMENT
-- ==========================================

-- Static pages/sections (About, Services, etc.)
CREATE TABLE static_contents (
    id SERIAL PRIMARY KEY,
    section_key VARCHAR(100) UNIQUE NOT NULL, -- 'about', 'services', 'hero', etc.
    content_type VARCHAR(50) DEFAULT 'page', -- page, section, component
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Localized static content
CREATE TABLE static_content_translations (
    id SERIAL PRIMARY KEY,
    content_id INTEGER REFERENCES static_contents(id) ON DELETE CASCADE,
    language_code VARCHAR(5) REFERENCES languages(code) ON DELETE CASCADE,
    title VARCHAR(200),
    subtitle VARCHAR(300),
    content TEXT,
    meta_title VARCHAR(200),
    meta_description TEXT,
    data JSONB, -- Flexible JSON data for different content types
    UNIQUE(content_id, language_code)
);

-- ==========================================
-- CONTACT & INQUIRY MANAGEMENT
-- ==========================================

-- Contact form submissions
CREATE TABLE contact_inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(100),
    phone VARCHAR(20),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    source VARCHAR(50) DEFAULT 'contact_form', -- contact_form, newsletter, etc.
    status VARCHAR(20) DEFAULT 'new', -- new, read, replied, archived
    ip_address INET,
    user_agent TEXT,
    language_preference VARCHAR(5),
    recaptcha_score DECIMAL(3,2),
    is_spam BOOLEAN DEFAULT FALSE,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact inquiry notes/responses
CREATE TABLE contact_inquiry_notes (
    id SERIAL PRIMARY KEY,
    inquiry_id INTEGER REFERENCES contact_inquiries(id) ON DELETE CASCADE,
    admin_id INTEGER REFERENCES admin_users(id),
    note TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- SYSTEM & ANALYTICS
-- ==========================================

-- Admin activity logs
CREATE TABLE admin_activity_logs (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin_users(id),
    action VARCHAR(100) NOT NULL, -- login, create_post, update_portfolio, etc.
    resource_type VARCHAR(50), -- blog_post, portfolio_project, etc.
    resource_id INTEGER,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Simple analytics tracking
CREATE TABLE page_views (
    id SERIAL PRIMARY KEY,
    path VARCHAR(500) NOT NULL,
    language_code VARCHAR(5),
    ip_address INET,
    user_agent TEXT,
    referrer VARCHAR(500),
    session_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Email logs for tracking sent emails
CREATE TABLE email_logs (
    id SERIAL PRIMARY KEY,
    to_email VARCHAR(255) NOT NULL,
    from_email VARCHAR(255) NOT NULL,
    subject VARCHAR(300) NOT NULL,
    template_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending', -- pending, sent, failed
    provider_id VARCHAR(100),
    error_message TEXT,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================

-- Blog posts indexes
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_featured ON blog_posts(is_featured) WHERE is_featured = TRUE;

-- Portfolio indexes
CREATE INDEX idx_portfolio_projects_status ON portfolio_projects(status);
CREATE INDEX idx_portfolio_projects_category ON portfolio_projects(category_id);
CREATE INDEX idx_portfolio_projects_sort ON portfolio_projects(sort_order);
CREATE INDEX idx_portfolio_projects_featured ON portfolio_projects(is_featured) WHERE is_featured = TRUE;

-- Contact inquiries indexes
CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX idx_contact_inquiries_created ON contact_inquiries(created_at DESC);
CREATE INDEX idx_contact_inquiries_email ON contact_inquiries(email);

-- Analytics indexes
CREATE INDEX idx_page_views_created ON page_views(created_at DESC);
CREATE INDEX idx_page_views_path ON page_views(path);

-- Translation indexes
CREATE INDEX idx_blog_translations_lang ON blog_post_translations(language_code);
CREATE INDEX idx_portfolio_translations_lang ON portfolio_project_translations(language_code);
CREATE INDEX idx_static_translations_lang ON static_content_translations(language_code);

-- ==========================================
-- INITIAL DATA SETUP
-- ==========================================

-- Insert supported languages
INSERT INTO languages (code, name, native_name, is_default, is_active) VALUES
('en', 'English', 'English', true, true),
('ko', 'Korean', '한국어', false, true),
('ja', 'Japanese', '日本語', false, true);

-- Insert default content categories
INSERT INTO content_categories (slug) VALUES
('web3'), ('blockchain'), ('defi'), ('nft'), ('announcements'), ('tutorials');

-- Insert category translations
INSERT INTO content_category_translations (category_id, language_code, name, description) VALUES
(1, 'en', 'Web3', 'Web3 technology and decentralized applications'),
(1, 'ko', '웹3', '웹3 기술과 탈중앙화 애플리케이션'),
(1, 'ja', 'Web3', 'Web3技術と分散型アプリケーション'),

(2, 'en', 'Blockchain', 'Blockchain technology and development'),
(2, 'ko', '블록체인', '블록체인 기술과 개발'),
(2, 'ja', 'ブロックチェーン', 'ブロックチェーン技術と開発'),

(3, 'en', 'DeFi', 'Decentralized Finance protocols and applications'),
(3, 'ko', '디파이', '탈중앙화 금융 프로토콜과 애플리케이션'),
(3, 'ja', 'DeFi', '分散型金融プロトコルとアプリケーション'),

(4, 'en', 'NFT', 'Non-Fungible Tokens and digital collectibles'),
(4, 'ko', 'NFT', '대체 불가능한 토큰과 디지털 수집품'),
(4, 'ja', 'NFT', '非代替性トークンとデジタルコレクティブル'),

(5, 'en', 'Announcements', 'Company news and announcements'),
(5, 'ko', '공지사항', '회사 뉴스와 공지사항'),
(5, 'ja', 'お知らせ', '会社のニュースとお知らせ'),

(6, 'en', 'Tutorials', 'Step-by-step guides and tutorials'),
(6, 'ko', '튜토리얼', '단계별 가이드와 튜토리얼'),
(6, 'ja', 'チュートリアル', 'ステップバイステップガイドとチュートリアル');

-- Insert default portfolio categories
INSERT INTO portfolio_categories (slug, sort_order) VALUES
('web3-dapps', 1), ('defi-protocols', 2), ('nft-platforms', 3), ('blockchain-infrastructure', 4);

-- Insert portfolio category translations
INSERT INTO portfolio_category_translations (category_id, language_code, name, description) VALUES
(1, 'en', 'Web3 DApps', 'Decentralized applications built on blockchain'),
(1, 'ko', '웹3 디앱', '블록체인 기반 탈중앙화 애플리케이션'),
(1, 'ja', 'Web3 DApps', 'ブロックチェーン上に構築された分散型アプリケーション'),

(2, 'en', 'DeFi Protocols', 'Decentralized finance protocols and platforms'),
(2, 'ko', '디파이 프로토콜', '탈중앙화 금융 프로토콜과 플랫폼'),
(2, 'ja', 'DeFiプロトコル', '分散型金融プロトコルとプラットフォーム'),

(3, 'en', 'NFT Platforms', 'Non-fungible token marketplaces and platforms'),
(3, 'ko', 'NFT 플랫폼', '대체 불가능한 토큰 마켓플레이스와 플랫폼'),
(3, 'ja', 'NFTプラットフォーム', '非代替性トークンマーケットプレイスとプラットフォーム'),

(4, 'en', 'Blockchain Infrastructure', 'Core blockchain infrastructure and tools'),
(4, 'ko', '블록체인 인프라', '핵심 블록체인 인프라와 도구'),
(4, 'ja', 'ブロックチェーンインフラ', 'コアブロックチェーンインフラストラクチャとツール');

-- Insert static content sections
INSERT INTO static_contents (section_key, content_type) VALUES
('hero', 'section'),
('about', 'page'),
('services', 'page'),
('why-choose-us', 'section'),
('contact-info', 'section'),
('footer', 'section');