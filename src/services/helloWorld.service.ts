import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HelloWorldService {
  private readonly emailKey: string;

  constructor(private readonly configService: ConfigService) {
    this.emailKey = this.configService.get<string>('config.emailKey');
    console.log('this.emailKey', this.emailKey);
  }

  getHelloWorld(): string {
    return 'Hello Swapnil Srivastava from Nest services!';
  }
}
