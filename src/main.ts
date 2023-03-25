import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { generateDocument } from './doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 创建文档 
  generateDocument(app)

  await app.listen(3000);

  console.log(`swagger-ui：localhost:3000/api/doc`);
  console.log(`knife4j：localhost:3000/doc.html`);
}
bootstrap();
