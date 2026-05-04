# SkillSphere – Online Learning Platform

A modern online learning platform built with Next.js where users can explore courses, watch lessons, and enroll in skill-based programs.

## Live URL
[https://z-anim7-skillsphere-ph13-a8.vercel.app/]

## Key Features
- Browse 8+ expert-led courses across multiple categories
- Hero banner with Swiper.js autoplay slider
- User authentication (Email/Password + Google OAuth) via BetterAuth
- Protected course details page
- Search courses by title
- My Profile with update functionality
- Toast notifications, loading states, 404 page
- Fully responsive on mobile, tablet, and desktop

## npm Packages Used
- `next` – App framework
- `better-auth` – Authentication
- `prisma` + `@prisma/client` – Database ORM (SQLite)
- `swiper` – Hero carousel
- `react-hot-toast` – Toast notifications
- `lucide-react` – Icon library
- `daisyui` – UI components
- `animate.css` – CSS animations

## Setup Instructions

```bash
# Clone the repo
git clone https://github.com/anim710/z.anim7_skillsphere_ph13_a8.git
cd skillsphere
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your values in .env.local

# Set up the database
npx prisma db push

# Run the development server
npm run dev
```

## Environment Variables
See `.env.example` for required variables.