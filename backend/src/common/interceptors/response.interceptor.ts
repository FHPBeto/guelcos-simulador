// response.interceptor.ts
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const method = request.method;
    const path = request.url;
    const timestamp = new Date().toISOString();

    return next.handle().pipe(
      map((responseData) => {
        return {
          success: true,
          timestamp,
          path,
          method,
          message: responseData?.message || null,
          data: responseData?.data || responseData || null,
        };
      }),
    );
  }
}
