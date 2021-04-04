import { MailerOptionsFactory, MailerOptions } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

export class MailerConfigService implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: process.env.MAILER_HOST,
        port: Number(process.env.MAILER_PORT),
        ignoreTLS: !Number(process.env.MAILER_TLS),
        secure: !!Number(process.env.MAILER_SECURE),
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS
        }
      },
      defaults: {
        from: process.env.MAILER_FROM
      },
      template: {
        dir: process.cwd() + '/src/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true
        }
      }
    }
  }
}
