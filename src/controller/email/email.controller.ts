import { Body, Controller, Post, Options, Logger } from '@nestjs/common';
import { EmailService } from '../../services/email.service';

@Controller('email')
export class EmailController {
  private readonly logger = new Logger(EmailController.name);

  constructor(private readonly emailService: EmailService) {}

  @Post('/sendnestemail')
  sendNestEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('htmlBody') htmlBody: string,
  ) {
    this.logger.log('Received POST request to send email');
    console.log("sendnestemail ====> ", "to->", to, "     subject->",subject, "    htmlBody->", htmlBody)
    this.emailService.sendNestEmailService(to, subject, htmlBody);
  }

  @Options('sendnestemail')
  options() {
    this.logger.log('Received OPTIONS request');
    return;
  }
}
