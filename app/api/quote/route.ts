import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const CUSTOMER_FIELDS = new Set([
  "firstName",
  "surname",
  "email",
  "phone",
  "addressLine1",
  "postcode",
  "contactMethod",
  "comments",
  "additionalInfo",
  "specialRequests",
  "siteVisitDate",
  "companyName",
  "gardenImage",
]);

// Helper to convert camelCase to Title Case
function formatFieldName(key: string): string {
  // Add space before capital letters
  const spaced = key.replace(/([A-Z])/g, " $1");
  // Capitalize the first letter of each word
  return spaced
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Helper to format values (booleans, arrays, etc.)
function formatFieldValue(value: any): string {
  if (value === true) return "Yes";
  if (value === false) return "No";
  if (Array.isArray(value)) {
    if (value.length === 0) return "None selected";
    return value.join(", ");
  }
  if (value === null || value === undefined || value === "") return "Not provided";
  return String(value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceName, ...allDetails } = body;

    if (!serviceName) {
      return NextResponse.json(
        { error: "Service name is required." },
        { status: 400 }
      );
    }

    // Extract customer details
    const firstName = allDetails.firstName || "";
    const surname = allDetails.surname || "";
    const email = allDetails.email || "";
    const phone = allDetails.phone || "";
    const addressLine1 = allDetails.addressLine1 || "";
    const postcode = allDetails.postcode || "";
    const contactMethod = allDetails.contactMethod || "";
    const comments = allDetails.comments || allDetails.additionalInfo || allDetails.specialRequests || "";
    const siteVisitDate = allDetails.siteVisitDate || "";
    const companyName = allDetails.companyName || "";
    const gardenImage = allDetails.gardenImage || "";

    if (!firstName || !surname || !email || !phone) {
      return NextResponse.json(
        { error: "First name, surname, email, and phone number are required." },
        { status: 400 }
      );
    }

    // Extract specific details (anything not in CUSTOMER_FIELDS)
    const specificDetailsList: { label: string; value: string }[] = [];
    Object.keys(allDetails).forEach((key) => {
      if (!CUSTOMER_FIELDS.has(key)) {
        specificDetailsList.push({
          label: formatFieldName(key),
          value: formatFieldValue(allDetails[key]),
        });
      }
    });

    // Configure Mailer
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "info@cleanchasecleaning.co.uk";

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

    // Specific details rows rendering (2 columns per row)
    let specificDetailsRows = "";
    if (specificDetailsList.length > 0) {
      specificDetailsRows = '<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 10px;">';
      for (let i = 0; i < specificDetailsList.length; i += 2) {
        const item1 = specificDetailsList[i];
        const item2 = specificDetailsList[i + 1];

        specificDetailsRows += '<tr>';
        specificDetailsRows += `
          <td style="width: 50%; padding: 12px 16px 12px 0; vertical-align: top; border-bottom: 1px solid #f1f5f9;">
            <div style="font-size: 12px; font-weight: 600; color: #64748b; margin-bottom: 4px;">${item1.label}</div>
            <div style="font-size: 14px; font-weight: bold; color: #0f172a;">${item1.value}</div>
          </td>
        `;

        if (item2) {
          specificDetailsRows += `
            <td style="width: 50%; padding: 12px 0 12px 16px; vertical-align: top; border-bottom: 1px solid #f1f5f9;">
              <div style="font-size: 12px; font-weight: 600; color: #64748b; margin-bottom: 4px;">${item2.label}</div>
              <div style="font-size: 14px; font-weight: bold; color: #0f172a;">${item2.value}</div>
            </td>
          `;
        } else {
          specificDetailsRows += `
            <td style="width: 50%; padding: 12px 0 12px 16px; vertical-align: top; border-bottom: 1px solid #f1f5f9;">&nbsp;</td>
          `;
        }
        specificDetailsRows += '</tr>';
      }
      specificDetailsRows += '</table>';
    } else {
      specificDetailsRows = `
        <div style="color: #94a3b8; font-style: italic; font-size: 14px; padding: 10px 0;">No extra details provided.</div>
      `;
    }

    // Fancy HTML Email Template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Quote Request - Clean Chase Cleaning</title>
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
            max-width: 750px;
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
            width: 35%;
            padding: 8px 0;
            font-size: 14px;
            font-weight: 600;
            color: #64748b;
            vertical-align: top;
          }
          .grid-value {
            display: table-cell;
            width: 65%;
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
            font-size: 13px;
            font-weight: 800;
            border-radius: 9999px;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>Clean Chase Cleaning</h1>
              <p>New Quote Request</p>
            </div>
            <div class="content">
              <p class="intro">Hello Team,</p>
              <p class="intro">You have received a new custom cleaning quote request from the website. Details are listed below:</p>
              
              <div class="section-title">Requested Service</div>
              <div style="margin-bottom: 24px;">
                <span class="badge">${serviceName}</span>
              </div>

              <div class="section-title">Customer Information</div>
              <div class="grid">
                <div class="grid-row">
                  <div class="grid-label">Full Name</div>
                  <div class="grid-value"><strong>${firstName} ${surname}</strong></div>
                </div>
                ${
                  companyName
                    ? `
                <div class="grid-row">
                  <div class="grid-label">Company Name</div>
                  <div class="grid-value">${companyName}</div>
                </div>
                `
                    : ""
                }
                <div class="grid-row">
                  <div class="grid-label">Email Address</div>
                  <div class="grid-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Phone Number</div>
                  <div class="grid-value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Address</div>
                  <div class="grid-value">${addressLine1}</div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Postcode</div>
                  <div class="grid-value">${postcode}</div>
                </div>
                <div class="grid-row">
                  <div class="grid-label">Contact Method</div>
                  <div class="grid-value"><span style="text-transform: capitalize;">${contactMethod}</span></div>
                </div>
                ${
                  siteVisitDate
                    ? `
                <div class="grid-row">
                  <div class="grid-label">Requested Site Visit</div>
                  <div class="grid-value">${siteVisitDate}</div>
                </div>
                `
                    : ""
                }
              </div>
              
              <div class="section-title">Cleaning Specifications</div>
              <div style="margin-bottom: 28px;">
                ${specificDetailsRows}
              </div>

              ${
                comments
                  ? `
              <div class="section-title">Comments & Instructions</div>
              <div class="message-box">
                <p class="message-text">${comments}</p>
              </div>
              `
                  : ""
              }

              ${
                gardenImage
                  ? `
              <div class="section-title">Uploaded Garden Photo</div>
              <div style="margin-bottom: 28px;">
                <img src="cid:gardenPhoto" style="max-width: 100%; height: auto; border-radius: 12px; border: 1px solid #e2e8f0; display: block;" alt="Uploaded Garden Photo" />
              </div>
              `
                  : ""
              }
            </div>
            <div class="footer">
              <p>This request was sent automatically from the Clean Chase Cleaning quote portal.</p>
              <p>&copy; ${currentYear} Clean Chase Cleaning. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Process attachment
    const attachments = [];
    if (gardenImage && typeof gardenImage === "string" && gardenImage.startsWith("data:")) {
      const commaIndex = gardenImage.indexOf(",");
      if (commaIndex !== -1) {
        const base64Data = gardenImage.substring(commaIndex + 1);
        let contentType = "image/png";
        const mimeMatch = gardenImage.substring(0, commaIndex).match(/data:([^;]+);base64/);
        if (mimeMatch) {
          contentType = mimeMatch[1];
        }
        const ext = contentType.split("/")[1] || "png";
        attachments.push({
          filename: `garden-photo.${ext}`,
          content: base64Data,
          encoding: "base64" as const,
          cid: "gardenPhoto",
        });
      }
    }

    // Send Mail
    await transporter.sendMail({
      from: `"${firstName} ${surname} (Quote Request)" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `New Quote Request: ${serviceName} - from ${firstName} ${surname}`,
      text: `New Quote Request for ${serviceName}\n\nName: ${firstName} ${surname}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${addressLine1}, ${postcode}${
        gardenImage ? "\n\nNote: A garden photo has been attached to this email." : ""
      }`,
      html: htmlTemplate,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Nodemailer error in quote:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to send quote request. Please try again later." },
      { status: 500 }
    );
  }
}
