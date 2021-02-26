import nodemailer, { Transporter } from 'nodemailer'
import { resolve } from 'path'
import handlebars from 'handlebars'
import fs from 'fs'

class SendMailService
{

    private client: Transporter

    constructor()
    {
        nodemailer.createTestAccount().then( acc => {
            const transporter = nodemailer.createTransport(
                {
                    host: acc.smtp.host,
                    port: acc.smtp.port,
                    secure: acc.smtp.secure,
                    auth: 
                    {
                        user: acc.user,
                        pass: acc.pass
                    }
                }
            )

            this.client = transporter
        })
    }

    async execute(to: string, subject: string, body: string)
    {
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")
        const templateFileContent = fs.readFileSync(npsPath).toString("utf8")

        const mailTemplateParse = handlebars.compile(templateFileContent)

        const html = mailTemplateParse(
            { 
                name: to, 
                title: subject, 
                description: body 
            }
        )
        

        const message = await this.client.sendMail(
            {
                to,
                subject,
                html,
                from: "NPS <noreplay@nps.com.br>"
            }
        )

        console.log(`Message sent: ${message.messageId}`)
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`)
    }
}

export default new SendMailService()