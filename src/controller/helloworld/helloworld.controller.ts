import { Controller, Get } from '@nestjs/common';
import { HelloWorldService } from '../../services/helloWorld.service';

@Controller()
export class HelloWorldController {
  constructor(private readonly helloWorldService: HelloWorldService) {}

  @Get('/helloworld')
  getHelloWorld(): string {
    return this.helloWorldService.getHelloWorld();
  }

  
}
