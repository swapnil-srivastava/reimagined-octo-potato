import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from '../../services/email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/sendnestemail')
  sendNestEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('htmlBody') htmlBody: string,
  ) {
    console.log("sendnestemail", to, subject, htmlBody)
    this.emailService.sendNestEmailService(to, subject, htmlBody);
  }
}
