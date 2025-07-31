import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👉 все контроллеры будут доступны под `/api/...`
  app.setGlobalPrefix('api');

  // 👉 разрешаем фронту (и Telegram-Web-App, если нужно) ходить на бекенд
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
