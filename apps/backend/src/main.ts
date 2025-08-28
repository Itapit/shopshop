/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import qs from 'qs';
import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    (app.getHttpAdapter().getInstance() as any).set('query parser', (str: string) => qs.parse(str));
    app.use(cookieParser());
    const globalPrefix = '';
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    const port = process.env.PORT || 3000;
    app.enableCors({
        origin: ['http://localhost:4200'],
        credentials: true,
    });
    await app.listen(port);
    Logger.log(`Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
