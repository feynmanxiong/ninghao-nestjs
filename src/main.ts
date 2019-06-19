import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DemoFilter } from './core/filters/demo.filter';
import { LoggingInterceptor } from 'dist/core/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new DemoFilter());
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(5000);
}
bootstrap();
