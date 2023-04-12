import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response {
  data: [] | {}
  meta?: object
  success: boolean
  message: string
  code: number
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const response: Response = {
          success: true,
          code: 200,
          data:data.data||data||undefined,
          meta:data.meta||data.page||undefined,
          message: '请求成功',
        };
        return response;
      }),
    );
  }
}