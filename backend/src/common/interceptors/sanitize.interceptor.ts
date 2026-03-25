// sanitize-interceptor.ts
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class SanitizeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.removeSensitive(data);
      }),
    );
  }

  private removeSensitive(obj: any) {
    if (!obj) return obj;

    if (Array.isArray(obj))
      return obj.map((item) => this.removeSensitive(item));

    if (typeof obj === 'object') {
      const clone = { ...obj };
      delete clone.password;

      for (const key of Object.keys(clone)) {
        clone[key] = this.removeSensitive(clone[key]);
      }

      return clone;
    }

    return obj;
  }
}
