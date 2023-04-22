import { Body, Controller, Post, Res } from '@nestjs/common';
import { EmailService } from '../../services/email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/sendemail')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('htmlBody') htmlBody: string,
    @Res() res: Response,
  ) {
    await this.emailService.sendEmail(to, subject, htmlBody);

    res.headers.set(
      'Access-Control-Allow-Origin',
      'https://swapnil.srivastava.eu',
    );

    return { message: 'Email sent successfully' };
  }
}
