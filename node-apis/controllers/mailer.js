import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import config from '../config/index.js';

/* https://ethereal.email/create */
/* let nodeConfig = nodemailer.createTransport({
    host: config.EMAIL_ETHEREAL.HOST,
    port: config.EMAIL_ETHEREAL.PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.EMAIL_ETHEREAL.USERNAME,
        pass: config.EMAIL_ETHEREAL.PASSWORD
    }
}); */
let nodeConfig = nodemailer.createTransport({
    host: config.EMAIL_ETHEREAL.HOST,
    port: 587,
    secure: true,
    auth: {
        user: config.EMAIL_ETHEREAL.USERNAME,
        pass: config.EMAIL_ETHEREAL.PASSWORD
    }
});

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/"
    }
});

export const registerMail = async(req, res) =>{
    const { username, userEmail, text, subject } = req.body;

    // Body of mail
    var email = {
        body: {
            name: username,
            intro: text || 'Welcome to daily Tuition! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? just reply to this email, we\'d love to help.',
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from: config.EMAIL_ETHEREAL.USERNAME,
        to: userEmail,
        subject: subject || "Signup successfully",
        html: emailBody
    }

    // Send Email
    transporter.sendMail(message).then(()=>{

        return res.status(200).send({ msg:"You should received an email from us." });

    }).catch(error=>{
        return res.status(500).send({ error });
    })

}

