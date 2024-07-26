import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as postmark from 'postmark';

@Injectable()
export class EmailService {
  private readonly emailKey: string;
  private client: postmark.Client;

  constructor(private readonly configService: ConfigService) {
    this.emailKey = this.configService.get<string>('config.emailKey');

    // Send an email:
    this.client = new postmark.Client(this.emailKey);

    console.log("constructor email server nestjs")
  }

  async sendEmail(
    to: string,
    subject: string,
    htmlBody: string,
  ): Promise<void> {
    await this.client.sendEmail({
      From: 'hello@swapnilsrivastava.eu',
      To: to,
      Subject: subject,
      HtmlBody: htmlBody,
      TextBody: 'Hello from Postmark!',
      MessageStream: 'outbound',
    });
  }
}
