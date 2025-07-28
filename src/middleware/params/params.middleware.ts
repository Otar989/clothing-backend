import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ParamsMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    // Stub middleware: do nothing for now
    return next();
  }
}
