import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from '../../services/email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/sendnestemail')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('htmlBody') htmlBody: string,
  ) {
    await this.emailService.sendEmail(to, subject, htmlBody);
  }
}
