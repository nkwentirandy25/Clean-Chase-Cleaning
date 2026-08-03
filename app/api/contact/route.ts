import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Basic Validation
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Configure Mailer
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "info@cleanchasecleaning.co.uk";

    // Create Transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const currentYear = new Date().getFullYear();

    // Fancy HTML Email Template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Enquiry - Clean Chase Cleaning</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f6f9fc;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .wrapper {
            width: 100%;
            background-color: #f6f9fc;
            padding: 40px 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border: 1px solid #eef2f6;
          }
          .header {
            background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
            padding: 32px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.5px;
          }
          .header p {
            color: rgba(255, 255, 255, 0.85);
            margin: 8px 0 0 0;
            font-size: 14px;
          }
          .content {
            padding: 32px;
          }
          .intro {
            font-size: 15px;
            color: #475569;
            line-height: 1.6;
            margin-bottom: 24px;
          }
          .section-title {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #94a3b8;
            margin-bottom: 12px;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 6px;
          }
          .grid {
            display: table;
            width: 100%;
            margin-bottom: 28px;
          }
          .grid-row {
            display: table-row;
          }
          .grid-label {
            display: table-cell;
            width: 30%;
            padding: 8px 0;
            font-size: 14px;
            font-weight: 600;
            color: #64748b;
            vertical-align: top;
          }
          .grid-value {
            display: table-cell;
            width: 70%;
            padding: 8px 0;
            font-size: 14px;
            color: #0f172a;
            vertical-align: top;
          }
          .grid-value a {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
          }
          .message-box {
            background-color: #f8fafc;
            border: 1px solid #f1f5f9;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 24px;
          }
          .message-text {
            font-size: 14px;
            color: #334155;
            line-height: 1.6;
            white-space: pre-wrap;
            margin: 0;
          }
          .footer {
            background-color: #f8fafc;
            padding: 24px 32px;
            text-align: center;
            border-top: 1px solid #f1f5f9;
          }
          .footer p {
            font-size: 12px;
            color: #94a3b8;
            margin: 4px 0;
          }
          .badge {
            display: inline-block;
            padding: 4px 12px;
            background-color: #e0e7ff;
            color: #4f46e5;
            font-size: 12px;
            font-weight: 700;
            border-radius: 9999px;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>Clean Chase Cleaning</h1>
              <p>New Website Contact Enquiry</p>
            </div>
            <div class="content">
              <p class="intro">Hello Team,</p>
              <p class="intro">You have received a new contact submission from your website's contact form. Here are the details:</p>
              
              <div class="section-title">Customer Information</div>
              <div class="grid">
                <div class="grid-row">
                  <div class="grid-label">Full Name</div>
                  <div class="grid-value"><strong>${name}</strong></div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Email Address</div>
                  <div class="grid-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Phone Number</div>
                  <div class="grid-value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Requested Service</div>
                  <div class="grid-value"><span class="badge">${service}</span></div>
                </div>
              </div>
              
              <div class="section-title">Message Details</div>
              <div class="message-box">
                <p class="message-text">${message}</p>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent automatically from the Clean Chase Cleaning website contact form.</p>
              <p>&copy; ${currentYear} Clean Chase Cleaning. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send Mail
    await transporter.sendMail({
      from: `"${name} (Website Contact)" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `New Enquiry: ${service} - from ${name}`,
      text: `New Website Enquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`,
      html: htmlTemplate,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
