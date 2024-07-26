import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as postmark from 'postmark';

@Injectable()
export class EmailService {
  private readonly emailKey: string;
  private client: postmark.Client;

  constructor(private readonly configService: ConfigService) {
    this.emailKey = this.configService.get<string>('config.emailKey');

    if (!this.emailKey) {
      throw new Error('Postmark API key is not defined');
    }

    // Send an email:
    this.client = new postmark.Client(this.emailKey);

    console.log('Postmark client initialized');
  }

   async sendNestEmailService(to: string, subject: string, htmlBody: string) {
    try {
      await this.client.sendEmail({
        From: 'hello@swapnilsrivastava.eu',
        To: to,
        Subject: subject,
        HtmlBody: htmlBody,
        TextBody: 'Hello from Postmark!',
        MessageStream: 'outbound',
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
