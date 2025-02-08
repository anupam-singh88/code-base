# Job Portal

## Overview
This project is a comprehensive Job Portal built using Next.js. It facilitates seamless interaction between candidates and recruiters, providing features for job applications, candidate management, and social engagement.
**Deployed**: https://nextjs-job-portal-clerkjs.vercel.app/
---

## Features

### Authentication
- **Sign In and Sign Up**: Utilizes [Clerk.js](https://clerk.dev/) for secure and efficient authentication.

### Profiles
- **Candidate Profile**: Allows candidates to create and manage their profiles, showcasing their skills and experiences.
- **Recruiter Profile**: Enables recruiters to manage their profiles and oversee job postings and applicant management.

### Job Applications
- **Apply to Jobs**: Candidates can browse job listings and apply directly.
- **Recruiter Actions**: Recruiters can review applications, select candidates for further consideration, or reject them.

### Social Feed
- **Post Creation**: Users can create posts with text and images.
- **Engagement**: Other users can like posts to foster community interaction.

---

## Tech Stack
- **Frontend**: Next.js
- **Authentication**: Clerk.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/job-portal.git
   cd job-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the following environment variables:
     ```env
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
     CLERK_SECRET_KEY=
     MONGODB_URL=

     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
     NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/sign-up

     NEXT_PUBLIC_SUPABASE_URL=
     NEXT_PUBLIC_SUPABASE_ANON_KEY=
     NEXT_PUBLIC_SUPABASE_BUCKET_NAME=job-board-public

     NEXT_PUBLIC_STRIPE_SECRET_KEY=
     NEXT_PUBLIC_STRIPE_PUBLIC_KEY=

     URL=
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`.

---

## Deployment
Follow the deployment guidelines for your hosting provider (e.g., Vercel, AWS, etc.). Ensure all environment variables are properly configured in the hosting environment.

---

## Usage

1. **Sign Up or Log In**:
   - New users can sign up, and existing users can log in using Clerk.js.

2. **Create a Profile**:
   - Candidates and recruiters can create and customize their profiles.

3. **Browse and Apply**:
   - Candidates can explore job postings and apply with a single click.

4. **Manage Applications**:
   - Recruiters can review, select, and reject applications efficiently.

5. **Engage with the Community**:
   - Use the feed to post updates, share images, and engage with likes.

---

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your branch.
   ```bash
   git push origin feature-name
   ```
4. Open a pull request detailing your changes.

