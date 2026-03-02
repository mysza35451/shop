import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true });
  app.use(cookieParser());
  app.use(pinoHttp());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 4000);
}

bootstrap();
