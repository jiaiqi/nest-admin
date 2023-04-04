import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './doc';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 创建文档
  generateDocument(app);

  await app.listen(3000);

  console.log(`swagger-ui：localhost:3000/api/doc`);
  console.log(`knife4j：localhost:3000/doc.html`);
}

bootstrap();
