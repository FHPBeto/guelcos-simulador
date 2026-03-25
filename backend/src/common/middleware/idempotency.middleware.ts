// idempotency.middleware.ts
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IdempotencyMiddleware implements NestMiddleware {
  private cache = new Map<string, any>();

  use(req: Request, res: Response, next: NextFunction) {
    const key = req.headers['idempotency-key'] as string;

    if (!key) {
      return next();
    }

    if (this.cache.has(key)) {
      return res.json({
        message: 'Requisition indempotent: returning stored requisition.',
        idempotent: true,
        data: this.cache.get(key),
      });
    }

    const originalJson = res.json.bind(res);

    res.json = (body: any) => {
      this.cache.set(key, body);

      return originalJson({
        message: 'Requisition processed and stored.',
        idempotent: false,
        data: body,
      });
    };

    next();
  }
}
