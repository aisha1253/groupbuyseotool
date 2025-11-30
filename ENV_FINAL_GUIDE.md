# Final Complete .env File Guide

## 📋 Complete Environment Variables List

Yeh sab environment variables `.env` file me add karne hain:

---

## 🗄️ 1. Database Configuration

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/groupbuytools"
```

### Options:

**Local PostgreSQL:**
```env
DATABASE_URL="postgresql://postgres:password123@localhost:5432/groupbuytools"
```

**Supabase (Free Tier):**
```env
DATABASE_URL="postgresql://postgres:xxxxx@db.xxxxx.supabase.co:5432/postgres"
```

**Neon (Free Tier):**
```env
DATABASE_URL="postgresql://user:password@ep-xxxxx.neon.tech/neondb?sslmode=require"
```

---

## 🔐 2. Clerk Authentication (REQUIRED)

### a) Publishable Key
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
```

**Kaise Lein:**
1. https://dashboard.clerk.com par jao
2. Application select karo
3. Left sidebar me **"API Keys"** click karo
4. **"Publishable Key"** copy karo (starts with `pk_test_` ya `pk_live_`)

---

### b) Secret Key
```env
CLERK_SECRET_KEY="sk_test_your_key_here"
```

**Kaise Lein:**
1. Same "API Keys" section me
2. **"Secret Key"** copy karo (starts with `sk_test_` ya `sk_live_`)
3. ⚠️ Secret key ko kabhi publicly share mat karo!

---

### c) Webhook Secret
```env
WEBHOOK_SECRET="whsec_your_secret_here"
```

**Kaise Lein:**
1. Clerk Dashboard > **"Webhooks"** section
2. **"Add Endpoint"** button click karo
3. Endpoint URL: `http://localhost:3000/api/webhooks/clerk` (development)
4. Events select karo:
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted`
5. **"Add Endpoint"** click karo
6. Endpoint create hone ke baad **"Reveal"** button se secret copy karo
7. Format: `whsec_...`

---

## 🌐 3. Application Configuration

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

**Development:**
```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

**Production:**
```env
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NODE_ENV="production"
```

---

## 📝 Complete .env File Template

Copy paste ready:

```env
# ===========================================
# DATABASE CONFIGURATION
# ===========================================
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/groupbuytools"

# ===========================================
# CLERK AUTHENTICATION
# ===========================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_clerk_publishable_key_here"
CLERK_SECRET_KEY="sk_test_your_clerk_secret_key_here"
WEBHOOK_SECRET="whsec_your_webhook_secret_here"

# ===========================================
# APPLICATION CONFIGURATION
# ===========================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## ✅ Step-by-Step Setup

### Step 1: Create .env File

Project root directory me `.env` file create karo:

**Windows:**
```bash
copy .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

Ya manually create karo naam se `.env`

---

### Step 2: Fill in Values

1. **Database URL** - Apna PostgreSQL connection string add karo
2. **Clerk Keys** - Clerk Dashboard se copy karo
3. **App URL** - Development me `http://localhost:3000`

---

### Step 3: Verify

Check karo ke:
- ✅ Har key properly filled hai
- ✅ Quotes (`"`) har value ke around hain
- ✅ No extra spaces
- ✅ Actual values add ki hain (not placeholders)

---

## 🚨 Important Notes

1. ❌ **Never commit .env to git** - Already in .gitignore
2. ✅ **Keep secrets safe** - Don't share publicly
3. ✅ **Use different keys for dev/prod**
4. ✅ **Backup your .env file** (securely)

---

## 🔍 Verification Checklist

- [ ] `.env` file project root me hai
- [ ] `DATABASE_URL` me correct connection string hai
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` add kiya hai
- [ ] `CLERK_SECRET_KEY` add kiya hai
- [ ] `WEBHOOK_SECRET` add kiya hai (webhook setup ke baad)
- [ ] `NEXT_PUBLIC_APP_URL` correct hai
- [ ] `NODE_ENV` set hai
- [ ] Koi placeholder values nahi rahne chahiye

---

## 🚀 After Setup

```bash
# Install dependencies (if needed)
npm install
npm install svix

# Database setup
npm run db:generate
npm run db:push

# Start development server
npm run dev
```

Agar sab sahi hai to server start ho jayega! 🎉

---

## 📞 Need Help?

1. Check Clerk Dashboard for keys: https://dashboard.clerk.com
2. Database connection test karo
3. Error messages properly read karo

**Sab kuch ready hai! 🚀**

