import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface JSONResponse<T> {
  code: number;
  data: T;
}

export type Response<T> = JSONResponse<T> | StreamableFile;

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map((data) =>
          data instanceof StreamableFile
            ? data
            : { code: 0, message: 'ok', data },
        ),
      );
  }
}
