import { Body, Controller, Get, Logger, Options, Post } from '@nestjs/common';
import { HelloWorldService } from '../../services/helloWorld.service';
import { EmailService } from '../../services/email.service';

@Controller('helloworld')
export class HelloWorldController {
  private readonly logger = new Logger(HelloWorldController.name);

  constructor(private readonly helloWorldService: HelloWorldService, private readonly emailService: EmailService) {}

  @Get()
  getHelloWorld(): string {
    this.logger.log('Received GET request for /helloworld endpoint');
    return this.helloWorldService.getHelloWorld();
  }

  @Post('/sendnestemail')
  sendNestEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('htmlBody') htmlBody: string,
  ) {
    this.logger.log('Received POST request to send email');
    this.emailService.sendNestEmailService(to, subject, htmlBody);
  }

  @Options('/sendnestemail')
  options() {
    this.logger.log('Received OPTIONS request');
    return;
  }

}
