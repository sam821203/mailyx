import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: 'http://localhost:4200', // 允許 Angular 前端的來源
      credentials: true, // 允許 cookie
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
