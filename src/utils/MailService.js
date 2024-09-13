const nodeMailer = require("nodemailer");
const Handlebars = require('handlebars');
const fs = require('fs');


const sendEmail = async (to_email, subject, file_path, data) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        host: process.env.SMTP,
        secure: true,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.SENDER_MAIL,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const html = fs.readFileSync(file_path, 'utf-8');
    const template = Handlebars.compile(html);

    const mailOptions = {
        from: process.env.MAIL_FROM_NAME + ' <' + process.env.MAIL_FROM_EMAIL + '>',
        to: to_email,
        subject: subject,
        html: template(data),
    }
    console.log(transporter,mailOptions);
    

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw error;
    }

    return { status: true, code: 200, message: "Email send successfully." }
}

module.exports = sendEmail;
