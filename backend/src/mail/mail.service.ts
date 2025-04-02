import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun.js';
import * as FormData from 'form-data';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private mailgun: mailgun.default;
  private mg: ReturnType<mailgun.default['client']>;

  constructor(private configService: ConfigService) {
    // 初始化 Mailgun 客戶端
    const apiKey = this.configService.get<string>('MAILGUN_API_KEY');
    const domain = this.configService.get<string>('MAILGUN_DOMAIN');

    if (!apiKey) {
      throw new Error('MAILGUN_API_KEY is not defined');
    }

    if (!domain) {
      throw new Error('MAILGUN_DOMAIN is not defined');
    }

    this.mailgun = new mailgun.default(FormData);
    this.mg = this.mailgun.client({
      username: 'api',
      key: apiKey,
    });
  }

  // 發送郵件的核心方法
  async sendMail(
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
  ) {
    const domain = this.configService.get<string>('MAILGUN_DOMAIN') || '';
    if (!domain) {
      throw new Error('MAILGUN_DOMAIN is not defined');
    }
    try {
      const data = await this.mg.messages.create(domain, {
        from,
        to,
        subject,
        text,
        html,
      });

      console.log('Email sent:', data);
      return data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
