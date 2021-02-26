import fs from 'fs';
import handlebaras from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

 
class SendMailservice {
    private client: Transporter;
    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            })
            this.client = transporter;
        })
    }

    async execute(to: string, subject: string, variables: Object, path: string) {

        const templateFileContent = fs.readFileSync(path).toString("utf8");
        const mailTemplateParse = handlebaras.compile(templateFileContent)

        const html = mailTemplateParse(
            variables
        )

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreplayce@NPS.com.br>"
        })

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}
export default new SendMailservice();