
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const twilio = require("twilio");

admin.initializeApp();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourgmail@gmail.com", // sender email
    pass: "your_app_password" // App password from Gmail (2FA required)
  }
});

// Optional: Twilio for SMS
const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
const authToken = "YOUR_TWILIO_AUTH_TOKEN";
const client = twilio(accountSid, authToken);

// Trigger on new booking
exports.sendBookingNotification = functions.firestore
  .document("bookings/{bookingId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    // Email content
    const mailOptions = {
      from: "Your Studio <yourgmail@gmail.com>",
      to: data.email, // client email
      subject: "Booking Confirmation",
      html: `<h3>Thank you ${data.name} for booking!</h3>
             <p>Your wedding shoot on ${data.date} has been received. Status: ${data.status}</p>`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully to:", data.email);

      // Optional SMS
      if (data.phone) {
        await client.messages.create({
          body: `Hi ${data.name}, your booking for ${data.date} is received. Status: ${data.status}.`,
          from: "+1234567890", // your Twilio number
          to: data.phone
        });
        console.log("SMS sent to:", data.phone);
      }
    } catch (error) {
      console.error("Error sending email/SMS:", error);
    }
  });
