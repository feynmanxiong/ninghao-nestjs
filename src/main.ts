import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DemoFilter } from './core/filters/demo.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new DemoFilter());
  await app.listen(5000);
}
bootstrap();
