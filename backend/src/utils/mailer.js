const Brevo = require('@getbrevo/brevo');

const sendVerificationEmail = async (toEmail, toName, verificationLink) => {
    const apiInstance = new Brevo.TransactionalEmailsApi();

    const apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
        email: process.env.BREVO_SENDER_EMAIL,
        name: process.env.BREVO_SENDER_NAME,
    };

    sendSmtpEmail.to = [
        {
            email: toEmail,
            name: toName,
        },
    ];

    sendSmtpEmail.subject = 'Verify Your Email - WebScrapper';

    sendSmtpEmail.htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Email Verification</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" style="padding: 40px 0;">
                        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                            <tr>
                                <td style="background:#ff6600; padding:30px; text-align:center;">
                                    <h1 style="color:#ffffff; margin:0; font-size:24px;">WebScrapper</h1>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:40px 30px;">
                                    <h2 style="color:#333333; margin-bottom:16px;">Verify Your Email Address</h2>
                                    <p style="color:#666666; font-size:16px; line-height:1.6;">
                                        Hi <strong>${toName}</strong>,
                                    </p>
                                    <p style="color:#666666; font-size:16px; line-height:1.6;">
                                        Thank you for registering on WebScrapper. Please click the button below to verify your email address.
                                    </p>
                                    <div style="text-align:center; margin:32px 0;">
                                        <a href="${verificationLink}"
                                            style="background:#ff6600; color:#ffffff; padding:14px 32px; text-decoration:none; border-radius:6px; font-size:16px; font-weight:bold; display:inline-block;">
                                            Verify Email
                                        </a>
                                    </div>
                                    <p style="color:#999999; font-size:14px; line-height:1.6;">
                                        This link will expire in <strong>24 hours</strong>. If you did not create an account, please ignore this email.
                                    </p>
                                    <p style="color:#999999; font-size:13px; word-break:break-all;">
                                        Or copy this link: <a href="${verificationLink}" style="color:#ff6600;">${verificationLink}</a>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="background:#f4f4f4; padding:20px; text-align:center;">
                                    <p style="color:#999999; font-size:12px; margin:0;">
                                        © ${new Date().getFullYear()} WebScrapper. All rights reserved.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
};

module.exports = { sendVerificationEmail };