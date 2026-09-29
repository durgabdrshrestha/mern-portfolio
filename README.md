# Personal MERN Portfolio

A full-stack portfolio website built with MongoDB, Express, React, and Node.js. This project separates the public portfolio website from the admin content management system so you can manage your personal profile, skills, projects, services, education, testimonials, messages, social links, and resume from one dashboard.

## Features

- Public portfolio website with dedicated pages
- Secure admin login with JWT authentication
- Content management dashboard for all site sections
- Project, skills, service, experience, education, testimonial, social link, and resume management
- Contact message handling for public enquiries
- MongoDB database integration
- Responsive design with React + Vite
- Production-ready structure for deployment

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT + bcrypt
- Upload handling: Multer

## Project Structure

- client/ - React frontend
- server/ - Express backend and MongoDB models

## 1. Prerequisites

Before you begin, install:

- Node.js 18+
- npm
- MongoDB Atlas or local MongoDB

## 2. Environment Setup

### Backend

Copy `server/.env.example` to `server/.env` and set the values for your environment:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio_db
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
ADMIN_NAME=Your Name
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=use_a_unique_password_of_at_least_12_characters
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=you@example.com
SMTP_PASS=your_smtp_password
SMTP_FROM=Portfolio Admin <you@example.com>
```

Use a unique, long random `JWT_SECRET` and a strong, unique admin password. Keep both `.env` files private and never commit them. If you use MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string and allow the backend host in the Atlas network access settings.

Configure the SMTP values with credentials from your email provider to send replies from Admin > Messages. Use port `465` with `SMTP_SECURE=true`, or port `587` with `SMTP_SECURE=false`. Replies cannot be sent until these server settings are configured.

### Frontend

Copy `client/.env.example` to `client/.env` and set the backend URL:

```env
VITE_API_URL=http://localhost:5000/api
```

## 3. Install Dependencies

From the root folder:

```bash
cd client
npm install

cd ../server
npm install
```

## 4. Run the Project

### Start backend

```bash
cd server
npm run dev
```

### Start frontend

```bash
cd client
npm run dev
```

Then open:

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 5. Create Admin Account

Create the first admin using the credentials configured in `server/.env`:

```bash
cd server
node createAdmin.js
```

The script creates one admin account if none exists, hashes the password before storing it, and does not print the password. It refuses to run when the required MongoDB or admin environment values are missing, or when the password is shorter than 12 characters. Re-running it will not create another account. To create an admin after the first one, use a deliberate account-management process rather than reintroducing a shared default credential.

## 6. Admin Login

Go to:

```text
http://localhost:5173/admin/login
```

Login using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `server/.env`. The server stores a bcrypt hash, and the frontend stores the short-lived JWT in browser local storage. Use a trusted HTTPS origin in production.

## 7. Admin Dashboard Features

After login, the admin dashboard gives access to:

- Profile
- Skills
- Services
- Experience
- Education
- Projects
- Testimonials
- Messages
- Social Links
- Resume
- User Management

The Messages section can send email replies when SMTP is configured in `server/.env`. The User Management section allows administrators to add, update, and remove admin accounts; use it only for trusted operators.

All of these sections are managed from the dashboard and update the public portfolio automatically.

## 8. Public Portfolio Sections

The public frontend includes:

- Home page
- About page
- Skills page
- Services page
- Experience page
- Education page
- Projects page
- Project details page
- Testimonials page
- Contact page

## 9. Content Management Guide

### Profile

Update your personal info, portfolio title, short bio, about section, contact details, availability, and profile image.

### Skills

Add skill names, categories, proficiency, and icons. Mark items active or inactive to show or hide them from public pages.

### Services

Add service offerings with description, short summary, and feature lists.

### Experience

Add roles, company names, dates, responsibilities, and technology stacks.

### Education

Add degrees, institutions, dates, and academic achievements.

### Projects

Manage projects with title, slug, short description, full description, image gallery, live URL, GitHub URL, tech stack, and category.

### Testimonials

Add testimonials with rating, relationship type, company, and featured flag.

### Messages

Review inbound contact submissions and mark them as read or delete them.

### Social Links

Update links for GitHub, LinkedIn, X, email, and other profile pages.

### Resume

Manage the active downloadable resume version.

## 10. Production Deployment Tips

For production deployment:

- Use environment variables instead of hardcoded URLs
- Use a production MongoDB cluster
- Set a strong JWT secret
- Configure HTTPS and deploy frontend/backend separately or behind a reverse proxy
- Add backup and monitoring tools
- Consider enabling rate limiting and request validation

For full deployment instructions, see [deployment.md](deployment.md).

## 11. Useful Scripts

Backend:

```bash
npm run dev
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run preview
```

## 12. Notes

This project is structured as a usable admin-driven portfolio system. The admin panel is intended to be the primary content management interface for your website.

## 13. Support

If you want, this project can be extended with:

- drag-and-drop file uploads
- dark/light theme toggle
- SEO metadata management
- analytics dashboard
- richer admin tables and filters
- multi-admin roles
- CMS editor support
