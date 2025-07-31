// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { join } from 'path';

import { ResInterceptor } from './interceptors/res.interceptor';
import { ParamsModule } from './middleware/params/params.module';

// модули приложения
import { InitializeModule } from './modules/initialize/initialize.module';
import { AdminModule } from './modules/admin/admin.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { BotModule } from './modules/bot/bot.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PromocodesModule } from './modules/promocodes/promocodes.module';

// ───────────────────────────────────────────────────────────
// новый контроллер-зонд
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL,
      entities: [join(__dirname, '/entities/**/*{.entity,.js,.ts}')],
      synchronize: true,
      cache: false,
      ssl: { rejectUnauthorized: false },
      retryAttempts: 10,
      retryDelay: 3000,
      keepConnectionAlive: true,
      extra: {
        connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 5,
      },
    }),

    // ядро
    ParamsModule,

    // бизнес-модули
    InitializeModule,
    AdminModule,
    CategoriesModule,
    ProductsModule,
    TasksModule,
    BotModule,
    FeedbackModule,
    OrdersModule,
    PromocodesModule,
  ],

  // ⬇️ добавили контроллер
  controllers: [HealthController],

  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResInterceptor,
    },
  ],
})
export class AppModule {}
