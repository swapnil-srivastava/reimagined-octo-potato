import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloWorldController } from './controller/helloworld/helloworld.controller';
import { HelloWorldService } from './services/helloWorld.service';
import { EmailService } from './services/email.service';
import { configuration } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule,
  ],
  controllers: [AppController, HelloWorldController],
  providers: [AppService, HelloWorldService, EmailService],
})
export class AppModule {}
