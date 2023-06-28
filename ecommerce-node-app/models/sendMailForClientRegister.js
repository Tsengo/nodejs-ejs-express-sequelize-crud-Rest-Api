// declare nodemailer from package.json and save it in variable nodemailer
const nodemailer = require('nodemailer')
// user transporter variable to send email to my email address
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'niktsenguashvili@gmail.com',
    pass: 'nciqtbghshftvktu'
  }
});
// Create function of email which will be used to send
const sendRegistrationEmail = (email) => {
  const mailOptions = {
    from: 'niktsenguashvili@gmail.com', // Sender address
    to: email, // Recipient address
    subject: 'Welcome to our website', // Email subject
    text: 'Thank you for registering!', // Plain text body
    html: '<h1>Thank you for registering!</h1>', // HTML body
  };
  
  // Send the email
  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
  
module.exports = sendRegistrationEmail;