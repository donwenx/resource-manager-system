import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './common/execption.filter';
import { TransformInterceptor } from './common/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(3000);
}
bootstrap();
