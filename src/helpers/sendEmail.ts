import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendEmail = async ({ mailOptions }: { mailOptions: any }) => {
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    });
  } catch (error) {
    return false;
  }
};

export default sendEmail;
