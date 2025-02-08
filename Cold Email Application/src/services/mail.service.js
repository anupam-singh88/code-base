import config from "../config/index.js";
import transporter from "../config/mail.js";
import logger from "../utils/logger.js";
import fs from "fs";
import path from "path";

class MailService {
  constructor(transporterInstance) {
    this.transporter = transporterInstance || transporter;
  }

  async sendEmail({ to, subject, text, html, attachments }) {
    try {
      if (!to) throw new Error("Recipient email is required");

      const mailOptions = {
        from: config.MAIL_FROM || "no-reply@example.com",
        to,
        subject,
        text,
        html,
        attachments,
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${to}: ${info.messageId}`);

      return { success: true, messageId: info.messageId };
    } catch (error) {
      logger.error(`Email sending failed: ${error.message}`);
      return { success: false, error: "Failed to send email" };
    }
  }

  async sendWelcomeEmail({ to, username }) {
    const subject = "Welcome to Our Platform!";
    const text = `Hello ${username},\n\nWelcome to our platform! We're excited to have you on board.`;
    const html = `
      <html>
      <body style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Welcome, ${username}!</h2>
        <p>We’re excited to have you on board.</p>
        <p>Explore our features and get started today!</p>
        <p style="margin-top: 20px;"><strong>Happy Exploring! 🚀</strong></p>
      </body>
      </html>
    `;

    return this.sendEmail({ to, subject, text, html });
  }

  async sendPasswordResetEmail({ to, username, resetLink }) {
    const subject = "Password Reset Request";
    const text = `Hello ${username},\n\nForgot your password? No worries! Click on the link below to reset your password.\n${resetLink}`;
    const html = `
      <html>
      <body style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Forgot your password, ${username}?</h2>
        <p>No worries! Click on the link below to reset your password.</p>
        <a href="${resetLink}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #333; color: #fff; text-decoration: none;">Reset Password</a>
        <p style="margin-top: 20px;">If you didn't request this, you can ignore this email.</p>
      </body>
      </html>
    `;

    return this.sendEmail({ to, subject, text, html });
  }

  async sendVerificationEmail({ to, username, verificationLink }) {
    const subject = "Email Verification";
    const text = `Hello ${username},\n\nWelcome to our platform! Click on the link below to verify your email.\n${verificationLink}`;
    const html = `
      <html>
      <body style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Verify your email, ${username}!</h2>
        <p>Welcome to our platform! Click on the link below to verify your email.</p>
        <a href="${verificationLink}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #333; color: #fff; text-decoration: none;">Verify Email</a>
        <p style="margin-top: 20px;">If you didn't create an account, you can ignore this email.</p>
      </body>
      </html>
    `;

    return this.sendEmail({ to, subject, text, html });
  }

  async loginMail({ to, username }) {
    const subject = "Login Notification";
    const text = `Hello ${username},\n\nYou have successfully logged in to your account.`;
    const html = `
      <html>
      <body style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Login Notification</h2>
        <p>Hello ${username}, you have successfully logged in to your account.</p>
        <p>If you didn't log in, please contact support immediately.</p>
      </body>
      </html>
    `;

    return this.sendEmail({ to, subject, text, html });
  }

  async verifyOtp({ to, username, otp }) {
    const subject = "Otp Verification";
    const text = `Hello ${username},\n\nWelcome to our platform! `;
    const html = `
      <html>
      <body style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Verify your otp, ${otp}!</h2>
        <p>Welcome to our platform! Click on the link below to verify your email.</p>
       
        <p style="margin-top: 20px;">If you didn't create an account, you can ignore this email.</p>
      </body>
      </html>
    `;

    return this.sendEmail({ to, subject, text, html });
  }

  async sendFrontendNew({
    to,
    pdfFileName = "anupamsingh_frontend.pdf",
    details: { hrName, companyName, jobTitle },
  }) {
    const filePath = path.join(process.cwd(), "public", pdfFileName);

    const attachments = [
      {
        filename: pdfFileName,
        path: filePath,
      },
    ];
    const subject = "Application for Frontend Developer Role 3yr Exp";

    // Handle missing values with appropriate messages
    const jobTitleText = jobTitle || "Frontend Developer";
    const companyNameText = companyName || "your company";
    const hrNameText = hrName
      ? hrName.toLowerCase() === "sir"
        ? "Dear Sir"
        : hrName.toLowerCase() === "mam"
          ? "Dear Mam"
          : `Hi ${hrName[0].toUpperCase() + hrName.slice(1)}`
      : "Dear Hiring Manager";

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Frontend Developer Application</title>
      </head>
      <body>
        <p>${hrNameText},</p>
  
        <p>I hope this email finds you well. My name is Anupam Singh, and I am a Full-Stack Developer with 3 years of experience specializing in frontend development. I came across the <strong>${jobTitleText}</strong> opening at <strong>${companyNameText}</strong> and am excited about the opportunity to contribute to your team.</p>
  
        <p>At Better Online Ltd, I led the development of the frontend for <a href="https://www.berti.ai/"><strong>BERTI.AI</strong></a> using React.js, Next.js, Ant Design, and Redux, significantly improving UI performance and user engagement. I also built dynamic UI components and dashboards, enhancing the speed and usability of the application. My expertise in modern frameworks like Next.js and Tailwind CSS, combined with my focus on creating intuitive and responsive interfaces, has consistently delivered impactful results.</p>
  
        <p>I would love to bring my skills in frontend development to <strong>${companyNameText}</strong>.</p>
  
        <p>I’d welcome the opportunity to discuss how my experience aligns with your needs. Please let me know a convenient time for a conversation.</p>
  
        <p>Looking forward to hearing from you!</p>
  
        <p>Best regards,<br>
          Anupam Singh<br>
          <a href="mailto:anupamsingh2389@gmail.com">anupamsingh2389@gmail.com</a> | +91 70651-69819<br>
          <a href="https://www.linkedin.com/in/anupam-singh88/" target="_blank">LinkedIn</a> | <a href="https://github.com/anupam-singh88" target="_blank">GitHub</a>
        </p>
      </body>
      </html>
    `;

    return this.sendEmail({ to, subject, html, attachments });
  }

  async sendBackendNew({
    to,
    pdfFileName = "anupamsingh_backend.pdf",
    details: { hrName, companyName, jobTitle },
  }) {
    const filePath = path.join(process.cwd(), "public", pdfFileName);

    const attachments = [
      {
        filename: pdfFileName,
        path: filePath,
      },
    ];
    const subject = "Application for Backend Developer Role 3yr Exp";

    // Handle missing values with appropriate messages
    const jobTitleText = jobTitle || "Backend Developer";
    const companyNameText = companyName || "your company";
    const hrNameText = hrName
      ? hrName.toLowerCase() === "sir"
        ? "Dear Sir"
        : hrName.toLowerCase() === "mam"
          ? "Dear Mam"
          : `Hi ${hrName[0].toUpperCase() + hrName.slice(1)}`
      : "Dear Hiring Manager";

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Backend Developer Application</title>
      </head>
      <body>
        <p>${hrNameText},</p>
  
        <p>I hope you’re doing well. My name is Anupam Singh, and I am a Full-Stack Developer with 3 years of experience, specializing in backend development. I recently came across the <strong>${jobTitleText}</strong> opening at <strong>${companyNameText}</strong> and am excited about the possibility of contributing to your team.</p>
  
        <p>In my current role at Better Online Ltd, I designed scalable RESTful APIs using NestJS, PostgreSQL, and MongoDB, which significantly enhanced backend performance and scalability. I also integrated advanced AI models (GPT, Claude, Gemini) to power conversational features, increasing user interaction. At Welkin Ring Digital Solutions, I optimized MySQL databases, reducing load times by 30%, and implemented JWT and OAuth-based authentication to strengthen application security.</p>
  
        <p>I would love to bring my expertise in backend development to <strong>${companyNameText}</strong>.</p>
  
        <p>I’d appreciate the opportunity to discuss how my skills align with your needs. Please let me know a convenient time for a conversation.</p>
  
        <p>Looking forward to hearing from you!</p>
  
        <p>Best regards,<br>
          Anupam Singh<br>
          <a href="mailto:anupamsingh2389@gmail.com">anupamsingh2389@gmail.com</a> | +91 70651-69819<br>
          <a href="https://www.linkedin.com/in/anupam-singh88/" target="_blank">LinkedIn</a> | <a href="https://github.com/anupam-singh88" target="_blank">GitHub</a>
        </p>
      </body>
      </html>
    `;

    return this.sendEmail({ to, subject, html, attachments });
  }

  async sendFullStackNew({
    to,

    pdfFileName = "anupamsingh_resume_mern.pdf",
    details: { hrName, companyName, jobTitle },
  }) {
    const filePath = path.join(process.cwd(), "public", pdfFileName);

    const attachments = [
      {
        filename: pdfFileName,
        path: filePath,
      },
    ];
    const subject = "Application for Full-Stack Developer Role 3yr Exp";

    // Handle missing values with appropriate messages
    const jobTitleText = jobTitle || "Full Stack";
    const companyNameText = companyName || "your company";
    const hrNameText = hrName
      ? hrName.toLowerCase() === "sir"
        ? "Dear Sir"
        : hrName.toLowerCase() === "mam"
          ? "Dear Mam"
          : `Hi ${hrName[0].toUpperCase() + hrName.slice(1)}`
      : "Dear Hiring Manager";

    const html = `
      <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Full-Stack Developer Application</title>
  </head>
  <body>
    <p>${hrNameText},</p>
  
    <p>I hope this email finds you well. My name is Anupam Singh, and I am a Full-Stack Developer with 3 years of experience building robust web applications using the MERN stack. I came across the <strong>${jobTitleText}</strong> opening at <strong>${companyNameText}</strong> and am excited about the opportunity to contribute to your team.</p>
  
    <p>At Better Online Ltd, I led the development of <a href="https://www.berti.ai/"><strong>BERTI.AI</strong></a> and <a href="https://lenny.ai/"><strong>LENNY.AI</strong></a>, where I integrated advanced AI models (GPT, Claude, Gemini) to enhance user engagement and built scalable RESTful APIs using NestJS, PostgreSQL, and MongoDB. I also integrated payment systems like PayPal and Paddle, optimizing the checkout experience and increasing conversion rates. My ability to work across the stack—from designing dynamic frontend interfaces to optimizing backend systems—has consistently delivered impactful results.</p>
  
    <p>I would love to bring my full-stack expertise to <strong>${companyNameText}</strong>.</p>
  
    <p>I’d welcome the opportunity to discuss how my experience aligns with your needs. Please let me know a convenient time for a conversation.</p>
  
    <p>Looking forward to hearing from you!</p>
  
    <p>Best regards,<br>
      Anupam Singh<br>
      <a href="mailto:anupamsingh2389@gmail.com">anupamsingh2389@gmail.com</a> | +91 70651-69819<br>
      <a href="https://www.linkedin.com/in/anupam-singh88/" target="_blank">LinkedIn</a> | <a href="https://github.com/anupam-singh88" target="_blank">GitHub</a>
    </p>
  </body>
  </html>
    `;

    return this.sendEmail({ to, subject, html, attachments });
  }
}

export default MailService = new MailService();
