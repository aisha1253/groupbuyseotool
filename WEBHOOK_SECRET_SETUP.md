# WEBHOOK_SECRET Kaise Lein - Step by Step Guide

## 📋 Complete Guide: Clerk Webhook Secret Setup

---

## 🔗 Step 1: Clerk Dashboard me Jao

1. Browser me jao: https://dashboard.clerk.com
2. Apne account se login karo
3. Apna application select karo (ya naya application create karo)

---

## ⚙️ Step 2: Webhooks Section me Jao

1. Left sidebar me **"Webhooks"** par click karo
   - Agar pehli baar hai to empty list dikhegi
   
2. **"Add Endpoint"** button par click karo
   - Ya **"Create Webhook"** button (interface ke according)

---

## 🔧 Step 3: Webhook Endpoint Create Karo

### A. Endpoint URL Add Karo:

**Development (Local):**
```
http://localhost:3000/api/webhooks/clerk
```

**Production:**
```
https://your-domain.com/api/webhooks/clerk
```

**Note:** Development me local URL directly work nahi karega. Iske liye:
- **Option 1:** ngrok use karo (temporary URL for testing)
- **Option 2:** Development ke liye abhi skip karo, production me add karna

**Local Testing ke liye ngrok:**
```bash
# Install ngrok
npm install -g ngrok

# Run ngrok
ngrok http 3000

# Ngrok se milega URL like: https://abc123.ngrok.io
# Use this: https://abc123.ngrok.io/api/webhooks/clerk
```

---

### B. Events Select Karo:

Webhook ko ye events listen karni hain:

- ✅ **`user.created`** - Jab naya user signup kare
- ✅ **`user.updated`** - Jab user update ho
- ✅ **`user.deleted`** - Jab user delete ho

Checkboxes me in events ko select karo.

---

### C. Endpoint Create Karo:

1. **"Add Endpoint"** ya **"Create"** button par click karo
2. Endpoint create ho jayegi

---

## 🔑 Step 4: Webhook Secret Copy Karo

1. Endpoint create hone ke baad, endpoint ki list me dikh jayegi

2. Endpoint row me:
   - **"Reveal"** button dikhega (ya eye icon)
   - Ya **"Show Secret"** button

3. **"Reveal"** button par click karo
   - Secret key show ho jayegi
   - Format: `whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

4. **Secret key copy karo**
   - Select karo aur Ctrl+C (ya Cmd+C on Mac)

---

## 📝 Step 5: .env File me Add Karo

Apni `.env` file me ye add/update karo:

```env
WEBHOOK_SECRET="whsec_your_actual_secret_key_here"
```

**Example:**
```env
WEBHOOK_SECRET="whsec_abc123def456ghi789jkl012mno345pqr678stu901vwx234"
```

**Important:**
- Quotes (`"`) ke andar rakho
- Koi extra spaces nahi
- Complete secret key paste karo

---

## ✅ Step 6: Verification

1. `.env` file save karo
2. Server restart karo:
   ```bash
   npm run dev
   ```

3. Test karo:
   - Clerk Dashboard me webhook endpoint ke samne **"Send test"** button ho sakta hai
   - Ya naya user signup karo - webhook automatically trigger hoga

---

## 🖼️ Visual Guide (Step by Step)

### Clerk Dashboard Navigation:
```
Dashboard
  └── Left Sidebar
      └── Webhooks (click here)
          └── Add Endpoint (button)
              ├── Endpoint URL: http://localhost:3000/api/webhooks/clerk
              ├── Events: ☑ user.created, ☑ user.updated, ☑ user.deleted
              └── Create/Add Endpoint
                  └── Endpoint created!
                      └── Click "Reveal" to see secret
                          └── Copy: whsec_xxxxx...
```

---

## 🚨 Common Issues & Solutions

### Issue 1: "Reveal" Button Nahi Dikha

**Solution:**
- Endpoint properly create hui hai check karo
- Page refresh karo
- Endpoint row par hover karo, options show honge

### Issue 2: Development me Local URL Work Nahi Kar Raha

**Solutions:**

**Option A: ngrok Use Karo (Recommended for Testing)**
```bash
# Install ngrok
npm install -g ngrok

# Terminal me run karo
ngrok http 3000

# Ngrok se milega URL
# Example: https://abc123.ngrok.io
# Use in Clerk: https://abc123.ngrok.io/api/webhooks/clerk
```

**Option B: Development me Skip Karo**
- Development me webhook optional hai
- Production deploy ke time webhook setup karo
- Abhi `.env` me placeholder rakho:
  ```env
  WEBHOOK_SECRET="whsec_placeholder_for_development"
  ```

### Issue 3: Secret Key Copy Nahi Ho Raha

**Solution:**
- Mouse se select karo
- Right click → Copy
- Ya keyboard shortcut: Ctrl+A (select all), Ctrl+C (copy)

---

## 📋 Quick Checklist

- [ ] Clerk Dashboard me logged in ho
- [ ] Application select kiya
- [ ] Webhooks section me gaye
- [ ] "Add Endpoint" button par click kiya
- [ ] Endpoint URL add kiya (localhost:3000 ya ngrok URL)
- [ ] Events select ki (user.created, user.updated, user.deleted)
- [ ] Endpoint create kiya
- [ ] "Reveal" button se secret key copy ki
- [ ] `.env` file me `WEBHOOK_SECRET` add kiya
- [ ] Server restart kiya

---

## 🎯 Production Setup

Jab production me deploy karoge:

1. Production URL use karo:
   ```
   https://yourdomain.com/api/webhooks/clerk
   ```

2. Clerk Dashboard me webhook endpoint update karo
   - Endpoint edit karo
   - Production URL add karo

3. Production me bhi same secret key use hogi

---

## 💡 Tips

1. **Secret Key Secure Rakho:**
   - Kabhi publicly share mat karo
   - Git me commit mat karo (already in .gitignore)

2. **Development vs Production:**
   - Development me ngrok ya skip karo
   - Production me proper domain URL use karo

3. **Testing:**
   - Webhook test karne ke liye naya user signup karo
   - Database me user create hua check karo

---

**Sab kuch setup hone ke baad webhook automatically kaam karega! 🎉**

Agar koi step me issue ho to batao!

