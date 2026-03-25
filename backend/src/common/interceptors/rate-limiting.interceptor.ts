// rate-limiting.interceptor.ts
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  private logs = new Map<string, number[]>();

  private WINDOW = 5000;
  private LIMIT = 5;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const ip = req.ip;

    const now = Date.now();
    const windowStart = now - this.WINDOW;

    const calls = (this.logs.get(ip) || []).filter((ts) => ts > windowStart);
    calls.push(now);

    this.logs.set(ip, calls);

    if (calls.length > this.LIMIT) {
      throw new BadRequestException('Too many requests. Try again later.');
    }

    return next.handle();
  }
}
