import nodemailer from 'nodemailer';
import config from '../config.js';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport(config.email);
  }

  /**
   * Send an email
   * @param {Object} options
   * @param {string} options.to - Recipient email
   * @param {string} options.subject - Email subject
   * @param {string} options.text - Plain text body
   * @param {string} [options.html] - HTML body (optional)
   * @param {string} [options.from] - Sender email (optional, uses default from config if not provided)
   * @returns {Promise} - Resolves with the send info
   */
  async sendMail({ to, subject, text, html, from = config.email.defaultFrom }) {
    try {
      const mailOptions = {
        from,
        to,
        subject,
        text,
        html
      };

      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  /**
   * Send a welcome email to a new user
   * @param {string} to - User's email address
   * @param {string} username - User's username
   */
  async sendWelcomeEmail(to, username) {
    const subject = 'Welcome to Kanban!';
    const text = `Hi ${username}!\n\nWelcome to Kanban. We're excited to have you on board.\n\nBest regards,\nThe Kanban Team`;
    const html = `
      <h1>Welcome to Kanban!</h1>
      <p>Hi ${username}!</p>
      <p>Welcome to Kanban. We're excited to have you on board.</p>
      <br>
      <p>Best regards,</p>
      <p>The Kanban Team</p>
    `;

    return this.sendMail({ 
      to, 
      subject, 
      text, 
      html,
      from: 'music@evensteven.us'
    });
  }

  /**
   * Send a password reset email
   * @param {string} to - User's email address
   * @param {string} resetToken - Password reset token
   * @param {string} username - User's username
   */
  async sendPasswordResetEmail(to, resetToken, username) {
    const subject = 'Password Reset Request';
    const resetLink = `${config.clientUrl}/reset-password?token=${resetToken}`;
    const text = `Hi ${username}!\n\nYou requested to reset your password. Click the following link to reset it:\n\n${resetLink}\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nThe Kanban Team`;
    const html = `
      <h1>Password Reset Request</h1>
      <p>Hi ${username}!</p>
      <p>You requested to reset your password. Click the following link to reset it:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>If you didn't request this, please ignore this email.</p>
      <br>
      <p>Best regards,</p>
      <p>The Kanban Team</p>
    `;

    return this.sendMail({ to, subject, text, html });
  }
}

// Create a singleton instance
const emailService = new EmailService();

export default emailService; 