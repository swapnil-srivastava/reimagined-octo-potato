import { Controller, Get, Logger } from '@nestjs/common';
import { HelloWorldService } from '../../services/helloWorld.service';

@Controller('helloworld')
export class HelloWorldController {
  private readonly logger = new Logger(HelloWorldController.name);

  constructor(private readonly helloWorldService: HelloWorldService) {}

  @Get()
  getHelloWorld(): string {
    this.logger.log('Received GET request for /helloworld endpoint');
    return this.helloWorldService.getHelloWorld();
  }

}
