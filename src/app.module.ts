import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { join } from 'path';

import { ResInterceptor } from './interceptors/res.interceptor';
import { ParamsModule } from './middleware/params/params.module';

import { InitializeModule } from './modules/initialize/initialize.module';
import { AdminModule } from './modules/admin/admin.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { BotModule } from './modules/bot/bot.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PromocodesModule } from './modules/promocodes/promocodes.module';

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

    // Подключаемся к MySQL через полный URL (DATABASE_URL) + TLS
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL,
      entities: [join(__dirname, '/entities/**/*{.entity,.js,.ts}')],
      synchronize: true,
      cache: false,

      // TLS для публичного Railway
      ssl: { rejectUnauthorized: false },

      // устойчивость к кратковременным обрывам
      retryAttempts: 10,
      retryDelay: 3000,
      keepConnectionAlive: true,

      // лимит соединений
      extra: {
        connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 5,
      },
    }),

    ParamsModule,

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
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResInterceptor,
    },
  ],
})
export class AppModule {}
