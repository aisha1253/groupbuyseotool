# GroupBuy Tools - Digital Marketplace Platform

A next-generation marketplace platform where buyers and sellers can trade digital tools (SEO tools, streaming accounts, AI tools, course accounts, etc.) with stunning 3D UI, AI-powered features, built-in chat, ratings, and invoice management.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: Clerk
- **Styling**: TailwindCSS + Shadcn/ui
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: React Three Fiber, Drei
- **Forms**: React Hook Form + Zod
- **File Upload**: Uploadthing
- **Charts**: Recharts
- **PDF**: React PDF

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Clerk account (for authentication)
- Uploadthing account (for file uploads)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/groupbuytools?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Uploadthing
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/               # Prisma schema
│   └── schema.prisma     # Database schema
└── public/               # Static assets
```

## 🎨 Features

### Week 1 (Foundation & Setup) ✅
- [x] Next.js 14 with TypeScript
- [x] TailwindCSS configuration
- [x] Prisma schema design
- [x] Clerk authentication setup
- [x] Base component library
- [x] Dark/Light theme support

### Week 2 (Landing Page & Seller Features)
- Landing page with 3D animations
- Seller dashboard
- Store management
- Product CRUD operations

### Week 3 (Buyer Experience)
- Buyer dashboard
- Product browsing with filters
- Product detail pages
- Price comparison tool

### Week 4 (Communication System)
- Tawk.to integration
- Internal messaging
- Real-time notifications

### Week 5 (Reviews & Trust)
- Review system
- Seller ratings
- Trust & safety features

### Week 6 (Orders & Invoices)
- Order management
- Invoice generation
- Payment infrastructure

### Week 7 (AI Features)
- AI recommendations
- Advanced analytics
- Gamification

### Week 8 (Polish & Launch)
- 3D enhancements
- Performance optimization
- SEO & accessibility
- Testing & bug fixes

## 🔧 Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database
npm run db:generate    # Generate Prisma Client
npm run db:push        # Push schema changes
npm run db:migrate     # Run migrations
npm run db:studio      # Open Prisma Studio

# Linting
npm run lint
```

## 📝 Database Schema

The Prisma schema includes:
- Users (Buyers/Sellers)
- Stores
- Products & Categories
- Plans & Combos
- Orders & Order Items
- Reviews & Ratings
- Cart & Wishlist
- Conversations & Messages
- Offers & Coupons

## 🎯 Next Steps

1. Set up your Clerk account and add credentials
2. Set up PostgreSQL database (local or cloud)
3. Configure Uploadthing for file uploads
4. Run database migrations
5. Start building features!

## 📄 License

This project is private and proprietary.

