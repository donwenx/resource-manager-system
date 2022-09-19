import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { AppException } from './exception';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = (exception as Error).message;
    const code = (exception as AppException).code;
    console.log(exception);
    response.status(HttpStatus.OK).json({
      code: code || -1,
      message: message,
    });
  }
}
