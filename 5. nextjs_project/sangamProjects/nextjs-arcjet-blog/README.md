# Blog App - Medium Clone

## Overview  
This project is a **Medium Clone** built with **Next.js**. It is a robust blogging application where users can share their thoughts and interact with others through comments. The app features user authentication, premium memberships, and advanced text editing tools.

**LIVE_URL**: https://nextjs-arcjet-blog-arcjet.vercel.app/login?from=%2F

---

## Features  

### Authentication  
- **Sign In and Sign Up**: Seamless user authentication powered by **Arcjet**.  
- **Email Validation**: Ensures disposable email addresses are rejected, providing a secure and verified user base.  

### Blog Creation  
- **Add Blogs**: Users can create blogs with **images** and **rich text**.  
- **Text Editor**: Leveraged **React Quill** for blog text modifications and formatting.  
- **Image Uploads**: Utilized **uploadthing** for easy and reliable image management.  

### Interaction  
- **Commenting**: Users can leave comments on other blogs, fostering engagement.  

### Premium Membership  
- **Payment Integration**: Enabled **PayPal** for seamless payments to unlock premium features.  

### UI and Styling  
- Designed with **Tailwind CSS** for responsive and modern styles.  
- Enhanced UI components using **Shadcn UI**.

---

## Tech Stack  

- **Framework**: Next.js  
- **Authentication**: Arcjet  
- **Styling**: Tailwind CSS, Shadcn UI  
- **Text Editor**: React Quill  
- **Image Uploads**: uploadthing  
- **Payment**: PayPal  
- **Database**: MongoDB 

---

## Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/anupam-singh88/nextjs-arcjet-blog-arcjet
   cd nextjs-arcjet-blog-arcjet
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Set up environment variables:  
   - Create a `.env.local` file in the root directory.
   - Add the following variables:
     ```env
    ARCJET_KEY=
    MONGODB_URI=
    JWT_SECRET=

    NEXT_PUBLIC_PAYPAL_CLIENT_ID=


    UPLOADTHING_TOKEN=
    UPLOADTHING_APP_ID=
    UPLOADTHING_SECRET=
     ```

4. Start the development server:  
   ```bash
   npm run dev
   ```

5. Open the app in your browser:  
   - Default: `http://localhost:3000`

---

## Deployment  

Deploy the application to your preferred hosting provider (e.g., Vercel or Netlify). Ensure the environment variables are correctly set up in the production environment.

---

## Usage  

1. **Sign Up and Login**: Create an account using Arcjet authentication.  
2. **Create a Blog**:  
   - Write text using the rich-text editor (React Quill).  
   - Upload images with the uploadthing integration.  
3. **Premium Access**: Subscribe to premium features via PayPal.  
4. **Engage**: Comment on other users’ blogs to share your thoughts.

---

## Contributing  

Contributions are welcome! Follow these steps:  

1. Fork the repository.  
2. Create a new branch for your feature or bug fix:  
   ```bash
   git checkout -b feature-name
   ```  
3. Commit your changes:  
   ```bash
   git commit -m "Add feature or fix description"
   ```  
4. Push your changes and open a pull request.  
