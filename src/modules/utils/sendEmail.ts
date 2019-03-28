import nodemailer from 'nodemailer'

export async function sendEmail(receiver: string, url: string) {

    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    const mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: receiver, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<a href="${url}">${url}</a>`
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions)

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

