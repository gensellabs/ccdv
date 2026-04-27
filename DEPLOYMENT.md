# CCDV Website — Deployment Guide

## 1. Add the Logo

Copy the CCDV logo file to:
```
public/logo.png
```

## 2. Set Up the Database (Neon — Free)

1. Go to https://neon.tech and create a free account
2. Create a new project called "ccdv"
3. Copy the **Connection string** (looks like `postgresql://user:pass@host/db?sslmode=require`)

## 3. Set Up Email (Resend — Free)

1. Go to https://resend.com and create a free account
2. In the dashboard, create an **API Key** and copy it
3. Once ccdv.co.za is ready, verify your domain in Resend → Domains
4. Until then, use `onboarding@resend.dev` as the FROM_EMAIL (Resend test address)

## 4. Push the Project to GitHub

Vercel deploys from GitHub. First, create a GitHub repository and push the project:

1. Go to https://github.com and create a new repository called `ccdv` (set it to Private)
2. Open a terminal, navigate to the project folder, and run:

```bash
cd /Users/Admin/Documents/ClaudeCode/projects/ccdv
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/ccdv.git
git add .
git commit -m "Initial CCDV website"
git push -u origin main
```

Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username.

## 5. Deploy to Vercel

1. Go to https://vercel.com and sign up (free — you can sign in with your GitHub account)
2. Click **Add New → Project**, then select the `ccdv` repository you just pushed
3. During setup, add these **Environment Variables**:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Neon connection string |
| `ADMIN_PASSWORD` | A strong password you choose |
| `RESEND_API_KEY` | Your Resend API key |
| `ADMIN_EMAIL` | `theoengels@me.com` |
| `FROM_EMAIL` | `onboarding@resend.dev` (until domain verified) |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL (e.g. `https://ccdv.vercel.app`) |

4. Click **Deploy** — Vercel will build and publish the site automatically

## 6. Run Database Migrations

After deploying, open a terminal, navigate to the project folder, and run:
```bash
npx prisma migrate deploy
```

Or to set up the database fresh:
```bash
npx prisma db push
```

## 7. Accessing the Admin Panel

Visit: `https://your-site.vercel.app/admin`

Log in with the `ADMIN_PASSWORD` you set in step 4.

From the admin panel you can:
- **Create and publish news posts** (with a visual markdown editor)
- **Moderate feedback submissions** — approve or reject before they go live

## 8. Custom Domain (ccdv.co.za)

In Vercel → your project → Settings → Domains, add `ccdv.co.za`.
Then update your DNS at your registrar to point to Vercel.

---

## Local Development

```bash
# 1. Copy env file
cp .env.local.example .env.local
# 2. Fill in your DATABASE_URL and ADMIN_PASSWORD at minimum

# 3. Push schema to database
npx prisma db push

# 4. Start development server
npm run dev
```

Site runs at: http://localhost:3000
Admin panel: http://localhost:3000/admin
