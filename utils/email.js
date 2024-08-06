import nodemailer from "nodemailer";
import environment from "./environment";

// Ensure environment variables are properly typed and defaulted
const EMAIL_USER = environment.EMAIL_USER;
const EMAIL_PASS = environment.EMAIL_PASS;

if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error("User Email and Pasword is not present");
}

const transporter = nodemailer.createTransport({
  service: "Gmail", // or another email service
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendingEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `VwFlex <${EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to send email: " + error.message);
    } else {
      throw new Error("Failed to send email due to unexpected error");
    }
  }
};

export default sendingEmail;
