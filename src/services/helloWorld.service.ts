import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloWorldService {
  getHelloWorld(): string {
    return 'Hello Swapnil Srivastava from services!';
  }
}
