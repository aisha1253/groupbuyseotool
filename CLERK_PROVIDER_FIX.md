# ClerkProvider Error Fix

## Error:
```
useUser can only be used within the <ClerkProvider /> component.
```

## Solution:

### 1. Ensure `.env` file has Clerk keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
CLERK_SECRET_KEY="sk_test_your_key_here"
```

### 2. Verify ClerkProvider is wrapping the app

The `app/layout.tsx` already conditionally wraps with ClerkProvider. Make sure:
- `.env` file exists in project root
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
- Server is restarted after adding env variables

### 3. If Clerk keys are not set:

The app will work but auth features won't be available. The Header will show "Sign Up" button.

## Quick Fix:

1. Create/update `.env` file with Clerk keys
2. Restart development server:
   ```bash
   npm run dev
   ```

The error should be resolved once ClerkProvider wraps the app properly.

