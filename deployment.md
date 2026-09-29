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
ADMIN_NAME=Your Name
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace_with_a_strong_password

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=admin@example.com
SMTP_PASS=your_app_password
SMTP_FROM=Portfolio Admin <admin@example.com>
UPLOAD_PROVIDER=local
```

### Frontend: client/.env

```env
VITE_API_URL=https://your-backend-domain.com/api
```

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

## 9. File upload notes

The current project uses local uploads by default.

For production hosting, ensure the server can write to the `uploads/` folder and that your hosting environment preserves uploaded files. If you deploy on serverless or ephemeral hosting, consider switching to Cloudinary or another persistent object storage service.

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
- [ ] Admin user created
- [ ] SMTP is configured for message replies
- [ ] HTTPS is enabled
- [ ] API health check is working
- [ ] Frontend build succeeds
