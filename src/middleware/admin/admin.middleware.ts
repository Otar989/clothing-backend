import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // Здесь потом можно сделать проверку прав админа
    next();
  }
}
