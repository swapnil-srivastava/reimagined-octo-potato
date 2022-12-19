import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloWorldController } from './controller/helloworld/helloworld.controller';
import { HelloWorldService } from './services/helloWorld.service';

@Module({
  imports: [],
  controllers: [AppController, HelloWorldController],
  providers: [AppService, HelloWorldService],
})
export class AppModule {}
