/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { existsSync } from 'fs';
import { resolve } from 'path';
import qs from 'qs';
import { AppModule } from './app/app.module';

function ensureEnv(): void {
    const candidates = [
        resolve(process.cwd(), '.env'), // running from repo root
        resolve(__dirname, '../../.env'), // dist/apps/backend/main.js -> repo root
        resolve(__dirname, '../../../.env'),
    ];
    const found = candidates.find((p) => existsSync(p));

    if (!found) {
        Logger.error('Missing .env at workspace root. Create it or export env vars.', 'EnvCheck');
        process.exit(1);
    }

    Logger.log(`.env found: ${found}`, 'EnvCheck');
}

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

ensureEnv();
bootstrap();
