# Web3 Korea Bridge Website

A modern, scalable React/Next.js website for Web3-Korea Bridge with multi-language support, admin dashboard, and content management capabilities.

## 🚀 Features

- **Next.js 14+** with App Router for optimal performance
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for rapid, consistent styling
- **Multi-language Support** (Korean/English) with next-intl
- **Admin Dashboard** for content management
- **Blog/News System** with CRUD functionality
- **Contact Form** with email notifications and reCAPTCHA
- **SEO Optimized** with structured data and meta tags
- **Mobile-First Responsive Design**
- **Performance Optimized** with image optimization and code splitting
- **Authentication System** with NextAuth.js
- **Database Integration** with PostgreSQL and Prisma ORM

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Query
- **UI Components**: Radix UI + Custom components
- **i18n**: next-intl
- **Forms**: React Hook Form + Zod validation

### Backend
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Email**: Resend
- **File Upload**: UploadThing
- **Validation**: Zod

### Security & Performance
- **reCAPTCHA**: v3 integration
- **Rate Limiting**: Built-in API protection
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: @next/bundle-analyzer
- **SEO**: Built-in optimization with structured data

## 📁 Project Structure

```
web3-korea-bridge/
├── app/                          # Next.js 14 App Router
│   ├── [locale]/                 # Internationalization routes
│   │   ├── (admin)/              # Admin routes (protected)
│   │   └── (main)/               # Public routes
│   └── api/                      # API Routes
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   ├── layout/                   # Layout components
│   ├── forms/                    # Form components
│   ├── content/                  # Content components
│   ├── admin/                    # Admin components
│   └── common/                   # Common components
├── lib/                          # Utility libraries
├── hooks/                        # Custom React hooks
├── store/                        # State management
├── types/                        # TypeScript types
├── styles/                       # Styling
├── prisma/                       # Database
├── messages/                     # Internationalization
└── public/                       # Static assets
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/web3-korea-bridge.git
   cd web3-korea-bridge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables in `.env.local`:
   - Database URL
   - NextAuth secret
   - reCAPTCHA keys
   - Email service credentials
   - File upload service credentials

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push database schema
   npm run db:push
   
   # (Optional) Seed the database
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗃️ Database Setup

### PostgreSQL Setup

1. **Install PostgreSQL** on your system
2. **Create a new database**:
   ```sql
   CREATE DATABASE "web3-korea-bridge";
   ```
3. **Update your `.env.local`** with the correct `DATABASE_URL`
4. **Run Prisma migrations**:
   ```bash
   npm run db:push
   ```

### Database Schema

The application uses the following main models:
- **User**: Admin users with role-based access
- **Post**: Blog posts with multi-language support
- **News**: News articles with categorization
- **Contact**: Contact form submissions
- **Category/Tag**: Content organization
- **Settings**: Site configuration

## 🌐 Internationalization

The application supports English and Korean languages:

- **Route Structure**: `/en/...` and `/ko/...`
- **Message Files**: `messages/en.json` and `messages/ko.json`
- **Database Content**: Multi-language JSON fields
- **SEO**: Localized meta tags and structured data

### Adding New Languages

1. Add locale to `i18n.ts`
2. Create message file in `messages/`
3. Update middleware configuration
4. Add language option to components

## 🔐 Authentication & Security

### Admin Access

The application includes a secure admin dashboard:

- **Route Protection**: Middleware-based authentication
- **Role-Based Access**: Admin and Editor roles
- **Secure Sessions**: JWT-based authentication
- **Password Hashing**: Argon2 encryption

### Security Features

- **reCAPTCHA Integration**: Spam protection for forms
- **Rate Limiting**: API endpoint protection
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM
- **XSS Protection**: React's built-in protection
- **CSRF Protection**: Next.js built-in protection

## 🎨 Styling & Design System

### Tailwind CSS Configuration

The application uses a comprehensive design system:

- **Color Palette**: Web3-themed colors with Korean influences
- **Typography**: Inter font with Korean font fallbacks
- **Components**: Consistent design tokens
- **Dark Mode**: Built-in support (optional)
- **Responsive Design**: Mobile-first approach

### Component Architecture

- **Atomic Design**: Atoms → Molecules → Organisms
- **Accessibility**: WCAG 2.1 AA compliance
- **TypeScript**: Strict prop interfaces
- **Reusability**: Composable components

## 📱 Performance Optimization

### Built-in Optimizations

- **Image Optimization**: WebP/AVIF conversion
- **Code Splitting**: Dynamic imports
- **Bundle Analysis**: Size monitoring
- **Caching**: Static generation and API caching
- **Font Optimization**: Self-hosted fonts
- **Core Web Vitals**: Performance monitoring

### Performance Budgets

- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Bundle Size**: < 500KB initial load

## 📧 Email Configuration

### Resend Setup

1. Create account at [Resend](https://resend.com)
2. Get API key and add to environment variables
3. Configure email templates in `lib/email.ts`
4. Test email functionality

### Email Features

- **Contact Form**: Automatic email notifications
- **Newsletter**: Subscription management
- **Admin Notifications**: System alerts
- **Templates**: Responsive HTML emails

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository
2. **Configure Environment Variables**: Add all required variables
3. **Database Setup**: Configure PostgreSQL database
4. **Deploy**: Automatic deployments on push

### Docker Deployment

```bash
# Build the container
docker build -t web3-korea-bridge .

# Run the container
docker run -p 3000:3000 web3-korea-bridge
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
```

### Code Quality

- **ESLint**: Code linting with Next.js configuration
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting
- **Husky**: Git hooks (optional)
- **Lint-staged**: Pre-commit linting (optional)

### Testing (Future Enhancement)

The architecture is prepared for testing with:
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: E2E testing
- **Playwright**: Cross-browser testing

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Write unit tests for new features
- Ensure accessibility compliance
- Follow the established code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: contact@web3-korea-bridge.com
- **Documentation**: [Project Wiki](wiki-link)
- **Issues**: [GitHub Issues](issues-link)

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Vercel**: For hosting and deployment platform
- **Tailwind CSS**: For the utility-first CSS framework
- **Prisma**: For the database toolkit
- **React**: For the UI library

---

**Built with ❤️ in Korea**