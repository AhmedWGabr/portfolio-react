import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  // TODO: Configure email transporter
  // Configure email transporter for Mailjet
  const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587, // Or 25, 8005, 2525
    secure: false, // true for 465, false for other ports
    auth: {
      user: '7bf6cf4c47d76c6ed61156dc50ea721f', // Mailjet API Key
      pass: '1f560649905a6ee842e879610c43410a' // Mailjet API Secret
    }
  });

  // Define email options
  const mailOptions = {
    from: 'eng.ahmed.wahba@outlook.com', // Fixed sender address validated in Mailjet
    replyTo: email, // User's email from the form for easy reply
    to: 'ahmed.wahba.gabr@gmail.com', // Recipient address (your email)
    subject: `New message from ${name || 'Anonymous'}`, // Subject line
    text: `Name: ${name || 'Anonymous'}\nEmail: ${email}\n\nMessage:\n${message}`, // Plain text body
    html: `<p>Name: ${name || 'Anonymous'}</p><p>Email: ${email}</p><p>Message: ${message}</p>`, // HTML body
  };

  try {
    // TODO: Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send message' }, { status: 500 });
  }
}
