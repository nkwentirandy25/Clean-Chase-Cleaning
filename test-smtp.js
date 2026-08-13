const nodemailer = require("nodemailer");
require("dotenv").config();

async function test() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "info@cleanchasecleaning.co.uk";

  console.log("SMTP Config:", {
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    user: smtpUser,
    receiver: receiverEmail
  });

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const gardenImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
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
        encoding: "base64",
        cid: "gardenPhoto",
      });
    }
  }

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <body>
      <h3>Clean Chase test email</h3>
      <p>Here is an inline garden photo:</p>
      <img src="cid:gardenPhoto" alt="Inline Garden Photo" />
    </body>
    </html>
  `;

  try {
    console.log("Sending mail...");
    const info = await transporter.sendMail({
      from: `"Test Sender" <${smtpUser}>`,
      to: receiverEmail,
      subject: "Test Quote Request with Inline Image",
      text: "Test email body",
      html: htmlTemplate,
      attachments: attachments,
    });
    console.log("Email sent successfully!", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

test();
