import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 3000);
  const configService = app.get(ConfigService);

  const logger = new Logger('bootstrap');
  const PORT: number = configService.get('PORT');
  const MODE: string = configService.get('MODE');

  await app.listen(PORT || 9000, () => {
    logger.log(`🚀 APPLICATION LISTENING ON PORT : ${PORT}`);
    logger.log(`🚀 APPLICATION RUNNING IN MODE : ${MODE} `);
  });
}
bootstrap();
