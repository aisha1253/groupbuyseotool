# Setup Commands - Step by Step

## ✅ Fixed Issues:
- ❌ Removed `@prisma/adapter-postgresql` (Prisma 7 me nahi chahiye)
- ✅ Added `svix` package (webhook ke liye)
- ✅ Simplified Prisma setup

---

## 🚀 Complete Setup Steps:

### Step 1: Dependencies Install Karo

```powershell
npm install
```

**Ye command automatically install karega:**
- @clerk/nextjs
- @prisma/client
- svix (webhook ke liye)
- Aur sab dependencies

---

### Step 2: Install Missing Package (svix)

```powershell
npm install svix
```

**Note:** Agar Step 1 me already install ho gaya to skip karo.

---

### Step 3: Database Setup

#### 3.1: Prisma Client Generate Karo

```powershell
npm run db:generate
```

**Ye command:**
- Prisma client generate karta hai
- Database schema se TypeScript types banata hai

#### 3.2: Database Push Karo (Development)

```powershell
npm run db:push
```

**Ye command:**
- Database me tables create karta hai
- Schema se database me changes push karta hai

**Important:** `.env` file me `DATABASE_URL` hona chahiye!

---

### Step 4: Server Start Karo

```powershell
npm run dev
```

**Server start hoga:** http://localhost:3000

---

## 📋 Complete Command Sequence:

Copy paste ready commands:

```powershell
# Step 1: Install dependencies
npm install

# Step 2: Install svix (if not installed)
npm install svix

# Step 3: Database setup
npm run db:generate
npm run db:push

# Step 4: Start server
npm run dev
```

---

## ⚠️ Important: .env File Check

Commands run karne se pehle `.env` file check karo:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/groupbuytools"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Agar `.env` file nahi hai to pehle banao!

---

## 🐛 Agar Error Aaye:

### Error: "Cannot find module"
```powershell
# node_modules delete karo
rm -rf node_modules
# Ya Windows me manually delete karo

# Phir install karo
npm install
```

### Error: "Database connection failed"
- `.env` file me `DATABASE_URL` check karo
- PostgreSQL server running hai verify karo

### Error: "Prisma client not generated"
```powershell
npm run db:generate
```

---

## ✅ Success Checklist:

- [ ] `npm install` successfully complete
- [ ] `npm install svix` successfully complete
- [ ] `npm run db:generate` successfully complete
- [ ] `npm run db:push` successfully complete
- [ ] `npm run dev` - Server start ho gaya
- [ ] Browser me http://localhost:3000 open ho raha hai

---

**Sab kuch ready hai! 🎉**

