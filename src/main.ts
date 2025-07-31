// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 обязательно! именно он делает /api/...
  app.setGlobalPrefix('api');

  // 👇 чтобы фронт и Telegram-Web-App могли стучаться
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
