# Clerk OTP & Forget Password Setup Guide

یہ guide آپ کو Clerk dashboard میں OTP verification اور Forget Password feature enable کرنے میں مدد کرے گی.

## 📧 Email OTP Verification (Signup پر)

### Step 1: Clerk Dashboard میں جائیں
1. [Clerk Dashboard](https://dashboard.clerk.com/) پر login کریں
2. اپنا application select کریں

### Step 2: Email Verification Enable کریں
1. Left sidebar میں **"User & Authentication"** section میں جائیں
2. **"Email, Phone, Username"** پر click کریں
3. **Email** section میں:
   - ✅ **"Require email verification"** enable کریں
   - ✅ **"Require email verification to sign in"** enable کریں (optional - agar chahtay hain ke signin ke liye bhi verification ho)
   - Verification method: **"Email code (OTP)"** select کریں

### Step 3: Email Template Configure کریں
1. **"Email templates"** section میں جائیں
2. **"Verification code"** template select کریں
3. Apne marzi ke email template customize کریں (optional)

### Result:
- Jab user signup karega, Clerk automatically OTP code email pe bhejega
- User ko OTP enter karna hoga signup complete karne ke liye
- Code already implemented hai - ab Clerk dashboard se enable karna hai

---

## 🔐 Forget Password Feature (Signin پر)

### Step 1: Password Reset Enable کریں
1. Clerk Dashboard میں **"User & Authentication"** section
2. **"Email, Phone, Username"** پر click کریں
3. **Email** section میں:
   - ✅ **"Password"** authentication method enable ہونا چاہیے (default mein enabled hota hai)
   - ✅ Password reset functionality automatically available hai

### Step 2: Password Reset Link Configure کریں
1. **"Paths"** section میں جائیں (Left sidebar)
2. **"Password reset"** path check karein:
   - Default: `/reset-password` ya apna custom path set karein
3. Agar custom path chahiye, to update karein

### Result:
- Sign-in page par automatically **"Forgot password?"** link show hoga
- User click karega to password reset flow start hoga
- Clerk automatically email mein reset link bhejega
- Code already implemented hai - Clerk automatically handle karega

---

## ⚙️ Code Implementation (Already Done ✅)

### Signup Page (`app/sign-up/page.tsx`)
```tsx
<SignUp 
  routing="hash"
  signInUrl="/sign-in"
  afterSignUpUrl="/dashboard-redirect"
  forceRedirectUrl="/dashboard-redirect"
  // OTP verification automatically handle hoga agar Clerk dashboard mein enabled ho
/>
```

**Features:**
- ✅ Email verification with OTP
- ✅ OTP input field automatically show hoga
- ✅ Resend code option available
- ✅ Styling customize ki gayi hai

### Signin Page (`app/sign-in/page.tsx`)
```tsx
<SignIn 
  routing="hash"
  signUpUrl="/sign-up"
  afterSignInUrl="/dashboard-redirect"
  // Forget password link automatically show hoga
/>
```

**Features:**
- ✅ Forget password link automatically visible
- ✅ Password reset flow built-in
- ✅ Styling customize ki gayi hai

---

## 📝 Important Notes

### Email OTP Verification
1. **Development Mode**: Clerk development mode mein emails automatically send hoti hain
2. **Production Mode**: Production ke liye proper email service configure karein (Clerk uses SendGrid by default)
3. **Testing**: Development mein Clerk dashboard ke **"Email logs"** section mein emails check kar sakte hain

### Forget Password
1. **Default Behavior**: Forget password feature by default enabled hota hai
2. **Email Template**: Clerk dashboard mein password reset email template customize kar sakte hain
3. **Redirect URL**: Password reset ke baad user automatically sign-in page par redirect ho jayega

---

## 🚀 Testing

### OTP Verification Test:
1. `/sign-up` page par jao
2. Email aur password enter karo
3. Submit karo
4. Email check karo - OTP code aayega
5. OTP enter karo
6. Signup complete hoga

### Forget Password Test:
1. `/sign-in` page par jao
2. **"Forgot password?"** link click karo
3. Email enter karo
4. Email check karo - reset link aayega
5. Link click karo
6. New password set karo
7. Sign in karo new password se

---

## 🔧 Troubleshooting

### OTP Email Nahi Aa Rahi?
1. Clerk Dashboard → **Email logs** check karein
2. Email service properly configured hai ya nahi check karein
3. Spam folder check karein
4. Development mode mein test karein (development mode mein emails automatically log hoti hain)

### Forget Password Link Nahi Dikhai De Rahi?
1. Check karein ke password authentication method enabled hai
2. Clerk Dashboard → **User & Authentication** → **Email, Phone, Username** → Password enabled hona chahiye
3. Browser cache clear karein

---

## ✅ Checklist

### Email OTP Setup:
- [ ] Clerk Dashboard mein email verification enabled
- [ ] OTP verification method selected
- [ ] Email templates configured (optional)
- [ ] Test kiya - OTP email aa raha hai

### Forget Password Setup:
- [ ] Password authentication enabled (default)
- [ ] Password reset path configured
- [ ] Test kiya - forget password link kaam kar raha hai

---

**Note:** Agar aapko kisi bhi step mein problem aaye, to Clerk documentation check karein: https://clerk.com/docs

