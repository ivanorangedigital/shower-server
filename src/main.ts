import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { IMG_PATH } from './paths/content.path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:4201', 'https://shower.orangebud.it']
  })

  app.useStaticAssets(IMG_PATH);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
