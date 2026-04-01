# Deployment Guide for HealthAuras (GitHub Pages & Resend Integration)

This document provides a step-by-step guide to deploying your frontend using **GitHub Pages** and explains how to securely handle your Resend API variables.

## 1. Important Resend API Warning
By standard security practices, Resend blocks directly sending emails from a browser (React `fetch` calls) to prevent random users from scraping your `VITE_RESEND_API_KEY` and abusing it. 
To make it work securely on a public site, we recommend using an intermediary like **Vercel Serverless Functions** or simply setting up **Cloudflare Pages**.

If you decide to deploy strictly on GitHub Pages using frontend fetch, you may hit CORS/API Key exposing errors. However, this codebase is ready to be embedded anywhere.

## 2. Deploying Securely via Cloudflare Pages (Highly Recommended for Resend)

Cloudflare Pages is a free and far superior platform for modern applications because it has **embedded serverless functions**. We've just added a `/functions/api/send-email.js` file into your code which safely handles the Resend traffic behind the scenes!

### Step 1: Connect your GitHub Repository to Cloudflare Pages
1. Make sure your latest code is pushed to your GitHub `main` branch.
2. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
3. Click **Create Application** -> click the **Pages** tab -> click **Connect to Git**.
4. Select your `Healthora` Github repository.
5. In the build settings:
   - **Framework preset**: `None` (or Vite)
   - **Build command**: `bun run build` (or `npm run build`)
   - **Build output directory**: `dist`

### Step 2: Add the Resend Secret Variable securely
*Do not skip this step! Your email won't send without it.*
1. While still on the setup page, scroll down to **Environment variables (advanced)**.
2. Click **Add variable**.
3. **Variable name**: `VITE_RESEND_API_KEY`
4. **Value**: `re_BjPocZQn_CNBSx2KfrdygqpDVV7AwF1hi` 
5. Click **Encrypt** to hide it!
6. Click **Save and Deploy**.

Cloudflare will automagically deploy your frontend *and* spin up your `/api/send-email` route securely so Resend allows the email to go out without exposing your API Key to the web!

### Custom Domain setup on Cloudflare
1. Go to your newly created Cloudflare Page settings.
2. Click on the **Custom Domains** tab -> **Set up a custom domain**.
3. Enter `healthauras.software` and click **Continue**. Cloudflare sets up the DNS rules automatically for you if your domain is managed there, otherwise it will give you easy CNAME records to copy/paste to GoDaddy/Namecheap.

---

## 3. Deploying to GitHub Pages via GitHub Actions

GitHub Pages is excellent for frontend-only React (Vite) applications. 
We have created an automated deployment workflow! This means every time you push code to the `main` branch, your website automatically updates.

### Step 1: Configure Your GitHub Repo Settings
1. Go to your GitHub repository -> **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, change it to **GitHub Actions**.

### Step 2: Add Your Resend Secret
In GitHub, environment variables for GitHub actions are stored securely:
1. Go to your repository -> **Settings** -> **Secrets and variables** -> **Actions**.
2. Click **New repository secret**.
3. **Name**: `VITE_RESEND_API_KEY`
4. **Secret**: `re_BjPocZQn_CNBSx2KfrdygqpDVV7AwF1hi` 
5. Click **Add secret**.

### Step 3: Pushing the Workflow
Assuming you push the `.github/workflows/deploy.yml` workflow (created by Github Copilot), GitHub will listen securely.

1. Commit all your changes:
   ```bash
   git add .
   git commit -m "feat: Add beautiful Resend UI and deployment Actions"
   git branch -M main
   git push -u origin main
   ```

2. That's it! In the "Actions" tab of your GitHub repo, you'll see it building and automatically publishing to your custom domain.

## Custom Domain configuration
If you are using `healthauras.software`:
1. In repo **Settings** -> **Pages** -> **Custom Domain**: enter `healthauras.software`.
2. Update your DNS in your domain registrar (like Namecheap, GoDaddy):
   * Add four **A Records** pointing to GitHub IPs:
     `185.199.108.153`
     `185.199.109.153`
     `185.199.110.153`
     `185.199.111.153`
   * Add a **CNAME** record: Host `@` or `www` pointing to `[your-github-username].github.io`.

---
*Created by your AI assistant for seamless operations.*