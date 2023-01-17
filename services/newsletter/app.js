const RabbitMQService = require('./rabbitmq-service')
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')


require('dotenv').config({ path: path.resolve(__dirname, '.env') })

async function processMessage(msg) {
    const mailData = JSON.parse(msg.content)
    try {
        const transporter = await nodemailer.createTransport({
            host: "SMTP.office365.com",
            port: 587,
            auth: {
                user: "jubbaapplication@outlook.com",
                    pass:"2468gclm"
            }
        })
        const mailOptions = {
            'from': "jubbaapplication@outlook.com",
            'to': `${mailData.clientFullName} <${mailData.to}>`,
            'subject': `Newsletter - ${mailData.subject}`,
            'text': mailData.text
        }

        await transporter.sendMail(mailOptions)

        console.log(`✔ SUCCESS`)
    } catch (error) {
        console.log(error)
        console.log(`X ERROR TO PROCESS: ${error.response}`)
    }
}

async function consume() {
    console.log(`INSCRITO COM SUCESSO NA FILA: ${process.env.RABBITMQ_QUEUE_NAME}`)
    await (await RabbitMQService.getInstance()).consume(process.env.RABBITMQ_QUEUE_NAME, (msg) => { processMessage(msg) })
}

consume()
