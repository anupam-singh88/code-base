import config from "../config/index.js";
import transporter from "../config/mail.js";
import logger from "../utils/logger.js";

class MailService {
  constructor(transporterInstance) {
    this.transporter = transporterInstance || transporter;
  }

  async sendEmail({ to, subject, text, html }) {
    try {
      if (!to) throw new Error("Recipient email is required");

      const mailOptions = {
        from: config.MAIL_FROM || "no-reply@example.com",
        to,
        subject,
        text,
        html,
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
}

export default MailService = new MailService();
