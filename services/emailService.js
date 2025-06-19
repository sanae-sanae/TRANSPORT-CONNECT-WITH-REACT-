import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    pool: true,
    maxConnections: 5,
    rateLimit: 10
  });
};

const transporter = createTransporter();
export const sendEmailWithRetry = async (options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await transporter.sendMail(options);
      logger.info(`Email sent to ${options.to}`);
      return true;
    } catch (error) {
      logger.error(`Email send attempt ${i+1} failed: ${error.message}`);
      
      if (i === retries - 1) {
        logger.error(`Failed to send email after ${retries} attempts`);
        return false;
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};
export const sendTemplatedEmail = async (to, templateName, data) => {
  let subject, html;
  
  switch(templateName) {
    case 'welcome':
      subject = 'Bienvenue sur TransportLogistics';
      html = `
        <div>
          <h2>Bienvenue ${data.name}!</h2>
          <p>Votre compte a été créé avec succès.</p>
        </div>
      `;
      break;
    case 'reset-password':
      subject = 'Réinitialisation de votre mot de passe';
      html = `
        <div>
          <p>Utilisez ce code pour réinitialiser votre mot de passe: ${data.code}</p>
        </div>
      `;
      break;
    default:
      throw new Error('Unknown email template');
  }
  
  return sendEmailWithRetry({
    from: `TransportLogistics <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};