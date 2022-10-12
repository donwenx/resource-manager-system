import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AppException } from './exception';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const httpResponse = (exception as BadRequestException).getResponse?.() as {
      message: string[];
    };
    let message = (exception as Error).message;
    const code = (exception as AppException).code;

    if (httpResponse) {
      message = httpResponse.message.join(',');
    }
    console.log('httpResponse', exception, httpResponse);
    response.status(HttpStatus.OK).json({
      code: code || -1,
      message: message,
    });
  }
}
