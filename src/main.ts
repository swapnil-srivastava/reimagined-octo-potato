import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://swapnilsrivastava.eu/*'],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
  });
  await app.listen(3000);
}
bootstrap();
