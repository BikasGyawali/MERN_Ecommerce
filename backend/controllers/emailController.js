const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = async (email, subject, text) => {
  try {
    console.log(email);
    console.log(subject);
    console.log(text);
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    console.log(transporter);
    const mail = await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: `Visit the given link to reset your password \n${text}`,
    });
    console.log("Email sent successfully");
  } catch (error) { 
    console.log("Given email doesn't exists");
  }
};
