import nodemailer, { Transporter } from 'nodemailer'
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

    async execute(to: string, subject: string, variables: object, path:string)
    {
        const templateFileContent = fs.readFileSync(path).toString("utf8") // Leitura do arquivo

        const mailTemplateParse = handlebars.compile(templateFileContent)

        const html = mailTemplateParse( variables )
        

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