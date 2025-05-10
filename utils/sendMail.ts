import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";
import { emailCircuitBreaker } from "./circuitBreaker";
import { emailQueue } from "./queue";
require("dotenv").config();

interface EmailOptions {
    email: string;
    subject: string;
    template: string;
    data: { [key: string]: any };
}

class EmailService {
    private transporter: Transporter;
    private static instance: EmailService;

    private constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    async sendMail(options: EmailOptions): Promise<void> {
        try {
            // Queue the email sending task
            await emailQueue.add('send-email', options);

            // Use circuit breaker for the actual sending
            await emailCircuitBreaker.execute(async () => {
                const template = await ejs.renderFile(
                    path.join(__dirname, "../mails/", options.template),
                    options.data
                );

                const mailOptions = {
                    from: process.env.SMTP_MAIL,
                    to: options.email,
                    subject: options.subject,
                    html: template,
                };

                await this.transporter.sendMail(mailOptions);
            });
        } catch (error: any) {
            console.error('Email sending failed:', error);
            // Re-queue failed emails with exponential backoff
            await emailQueue.add(
                'send-email', 
                options, 
                { 
                    attempts: 5,
                    backoff: {
                        type: 'exponential',
                        delay: 1000 // 1s, then 2s, 4s, 8s, 16s
                    }
                }
            );
            throw error;
        }
    }
}

const sendMail = async (options: EmailOptions): Promise<void> => {
    await EmailService.getInstance().sendMail(options);
};

export default sendMail;
