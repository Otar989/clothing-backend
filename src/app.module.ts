import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { join } from 'path';

import { ResInterceptor } from './interceptors/res.interceptor';

// middleware params
import { ParamsModule } from './middleware/params/params.module';

// feature modules (мы используем папку modules)
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
    TypeOrmModule.forRoot({
      type: 'mysql',
      extra: {
        connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 5,
      },
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      charset: 'utf8mb4_general_ci',
      database: process.env.DB_NAME,
      entities: [join(__dirname, '/entities/**/*{.entity,.js,.ts}')],
      synchronize: true,
      cache: false,
    }),

    // common
    ParamsModule,

    // features
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
