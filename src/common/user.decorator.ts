import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ParseTokenPipe } from './parse-token.pipe';

export const GetToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // console.log('request.query.token', request.query.token);
    return request.headers.token || request.query.token;
  },
);

export const RequestToken = () => GetToken(ParseTokenPipe);
