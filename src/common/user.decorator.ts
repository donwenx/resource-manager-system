import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ParseTokenPipe } from './parse-token.pipe';

export const GetToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('request.headers.token', request.headers.token);
    return request.headers.token;
  },
);

export const RequestToken = () => GetToken(ParseTokenPipe);
