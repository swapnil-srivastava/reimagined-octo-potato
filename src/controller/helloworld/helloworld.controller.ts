import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { HelloWorldService } from '../../services/helloWorld.service';
import { EmailService } from '../../services/email.service';

@Controller('helloworld')
export class HelloWorldController {
  private readonly logger = new Logger(HelloWorldController.name);

  constructor(private readonly helloWorldService: HelloWorldService, private readonly emailService: EmailService) {}

  @Get('/helloworld')
  getHelloWorld(): string {
    return this.helloWorldService.getHelloWorld();
  }

  @Post('/sendnestemail-hello')
  sendNestEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('htmlBody') htmlBody: string,
  ) {
    this.logger.log('Received POST request to send email');
    console.log("sendnestemail", to, subject, htmlBody)
    this.emailService.sendNestEmailService(to, subject, htmlBody);
  }

  
}
