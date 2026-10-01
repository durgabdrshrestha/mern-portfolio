# Deployment Guide

This project is ready to deploy as a full-stack portfolio application with a React frontend and Express/MongoDB backend.

## 1. Project structure

- client/ - Vite React frontend
- server/ - Express API and MongoDB models
- uploads/ - local uploaded assets for development
- README.md - main overview

## 2. Required environment variables

### Backend: server/.env

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio_db
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=https://your-frontend-domain.com
TRUST_PROXY_HOPS=1
ADMIN_NAME=Your Name
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace_with_a_strong_password

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=admin@example.com
SMTP_PASS=your_app_password
SMTP_FROM=Portfolio Admin <admin@example.com>
UPLOAD_PROVIDER=cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend: client/.env

```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_SITE_URL=https://your-frontend-domain.com
```

Set both values in the frontend hosting environment and rebuild after changing them. `VITE_SITE_URL` is used to generate `sitemap.xml` and `robots.txt` with the deployed domain.

## 3. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

## 4. Build the frontend

```bash
cd client
npm run build
```

This generates the production bundle in `client/dist/`.

## 5. Start backend in production

```bash
cd server
npm start
```

If using PM2 or a hosting service, run the backend as a persistent process.

## 6. Serve the frontend

### Option A: Static hosting
Upload the contents of `client/dist/` to:

- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages (with limitations for API calls)

### Option B: Node-based static serving
You can also serve the built frontend from a Node/Express server, but the cleaner setup is to deploy frontend and backend separately.

## 7. MongoDB setup

Use MongoDB Atlas or another managed MongoDB service.

Important:

- whitelist your server IP or use a managed cloud host
- ensure the connection string is correct
- create the database before starting the app

## 8. Admin setup

After deployment, create the first admin account:

```bash
cd server
node createAdmin.js
```

Then log in at:

```text
https://your-frontend-domain.com/admin/login
```

## 9. File upload storage

The server supports local disk and Cloudinary storage. Local disk is suitable for development or production hosts with persistent storage. On ephemeral/serverless hosts, set `UPLOAD_PROVIDER=cloudinary` and configure all three Cloudinary credentials in the backend hosting environment. These variables are server-only; never add Cloudinary secrets to the frontend or commit them.

Image and PDF uploads use Cloudinary when selected. Existing files already stored on local disk are not migrated automatically; copy/re-upload them before removing or losing the old server disk.

## 10. HTTPS and security

Before production launch:

- enable HTTPS
- use strong environment secrets
- set trusted CORS values
- restrict admin access
- keep `.env` files out of version control

## 11. Recommended hosting stack

- Frontend: Vercel or Netlify
- Backend: Render, Railway, DigitalOcean App Platform, or VPS
- Database: MongoDB Atlas
- Email: Gmail SMTP or a transactional email service

## 12. Optional future improvements

- Cloudinary media storage
- CDN for static assets
- Docker deployment
- CI/CD automation
- automated backups

## 13. Quick deploy checklist

- [ ] MongoDB connection string is valid
- [ ] Backend `.env` values are set
- [ ] Frontend `.env` values are set
- [ ] `CLIENT_URL` and `VITE_API_URL` point to deployed frontend and backend
- [ ] Admin bootstrap variables are set securely in the backend host environment
- [ ] Persistent media storage is configured and tested
- [ ] Admin user created
- [ ] SMTP is configured for message replies
- [ ] HTTPS is enabled
- [ ] API health check is working
- [ ] Frontend build succeeds
- [ ] `robots.txt` and `sitemap.xml` use the production domain

## Search engine indexing

After deployment, confirm that `https://your-frontend-domain.com/robots.txt` and `/sitemap.xml` are reachable, then submit the sitemap in Google Search Console and Bing Webmaster Tools. Keep your full name and accurate role consistent across the page title, visible page copy, profile data, and professional social profiles. Indexing and ranking depend on the search engines and cannot be guaranteed by metadata alone.

Set `TRUST_PROXY_HOPS` to the number of trusted reverse proxies in front of the API. Use `1` only when there is exactly one trusted proxy; otherwise use the host's documented value so rate limits use the actual client address.
