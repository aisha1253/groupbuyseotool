# Environment Variables Setup Guide

Yeh guide aapko batayegi ke `.env` file me kya kya add karna hai aur kaise setup karna hai.

## 📋 Step-by-Step Setup

### Step 1: `.env` File Create Karo

Project root directory me `.env` file create karo:

```bash
# Windows me
copy .env.example .env

# Mac/Linux me
cp .env.example .env
```

Ya manually create karo `.env` naam se file.

---

## 🔑 Clerk Keys Kaise Lein

### Option 1: Clerk Dashboard Se Keys Lein

1. **Clerk Dashboard me jao:**
   - https://dashboard.clerk.com par login karo
   - Apna application select karo (ya naya create karo)

2. **API Keys Lein:**
   - Left sidebar me **"API Keys"** par click karo
   - Yahan do keys milengi:
     - **Publishable Key** (`pk_test_...` ya `pk_live_...`)
     - **Secret Key** (`sk_test_...` ya `sk_live_...`)
   - Dono keys copy karo

3. **Webhook Secret Setup:**
   - Left sidebar me **"Webhooks"** par click karo
   - **"Add Endpoint"** button par click karo
   - Endpoint URL: `https://your-domain.com/api/webhooks/clerk`
   - Development me: `http://localhost:3000/api/webhooks/clerk` (temporary)
   - Events select karo:
     - ✅ `user.created`
     - ✅ `user.updated`
     - ✅ `user.deleted`
   - **"Add Endpoint"** par click karo
   - Endpoint create hone ke baad **"Reveal"** button se secret key copy karo
   - Yeh secret key `WEBHOOK_SECRET` me add karo

---

### Option 2: New Clerk Application Create Karo (Agar nahi hai)

1. https://dashboard.clerk.com par jao
2. **"Create Application"** button par click karo
3. Application name do (e.g., "GroupBuy Tools")
4. Authentication method select karo (Email/Phone/Social)
5. Create kar do
6. Ab API Keys mil jayengi

---

## 🗄️ Database Setup

### PostgreSQL Database URL Format

```
postgresql://username:password@host:port/database_name
```

### Examples:

**Local PostgreSQL:**
```
DATABASE_URL="postgresql://postgres:password123@localhost:5432/groupbuytools"
```

**Supabase (Free PostgreSQL):**
```
DATABASE_URL="postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres"
```

**Neon (Free PostgreSQL):**
```
DATABASE_URL="postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### Database Kaise Setup Karein:

1. **Local PostgreSQL Install:**
   - https://www.postgresql.org/download/ se download karo
   - Install karo
   - Username aur password set karo
   - Database create karo: `CREATE DATABASE groupbuytools;`

2. **Ya Cloud Database Use Karo:**
   - **Supabase:** https://supabase.com (Free tier available)
   - **Neon:** https://neon.tech (Free tier available)
   - **Railway:** https://railway.app (Free tier available)

---

## 📝 Complete `.env` File Example

Apni `.env` file me ye format me add karo:

```env
# Database
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/groupbuytools"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
CLERK_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## ✅ Verification Checklist

1. ✅ `.env` file project root me hai
2. ✅ `DATABASE_URL` me correct PostgreSQL connection string hai
3. ✅ `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` add kiya hai
4. ✅ `CLERK_SECRET_KEY` add kiya hai
5. ✅ `WEBHOOK_SECRET` add kiya hai (webhook setup ke baad)
6. ✅ `NEXT_PUBLIC_APP_URL` me correct URL hai
7. ✅ Koi extra spaces ya quotes issue nahi hai

---

## 🚨 Common Issues & Solutions

### Issue 1: "Missing Clerk Keys"
**Solution:** Clerk Dashboard se keys properly copy karo. Koi extra spaces nahi hone chahiye.

### Issue 2: "Database Connection Error"
**Solution:** 
- PostgreSQL server running hai verify karo
- Connection string me username/password correct hai check karo
- Database name correct hai verify karo

### Issue 3: "Webhook Not Working"
**Solution:**
- `WEBHOOK_SECRET` correctly add kiya hai check karo
- Clerk Dashboard me webhook endpoint properly configured hai verify karo
- Development me localtunnel ya ngrok use karo webhook testing ke liye

### Issue 4: "Environment Variables Not Loading"
**Solution:**
- Server restart karo after `.env` file changes
- Variable names correct hai verify karo (case-sensitive)
- `.env` file root directory me hai check karo

---

## 🔒 Security Notes

1. ❌ **Never commit `.env` file to git**
2. ✅ `.env` file ko `.gitignore` me add karo
3. ✅ Production me environment variables platform ke environment settings me add karo
4. ✅ Secret keys ko kabhi publicly share mat karo

---

## 🎯 Quick Start Commands

After `.env` file setup:

```bash
# Dependencies install (agar nahi kiye)
npm install

# Database setup
npm run db:generate
npm run db:push

# Development server start
npm run dev
```

---

## 📞 Support

Agar koi issue ho ya question ho to:
1. Clerk Dashboard documentation check karo: https://clerk.com/docs
2. Error messages properly read karo
3. Database connection test karo

**Sab kuch setup hone ke baad app ready hai! 🚀**

