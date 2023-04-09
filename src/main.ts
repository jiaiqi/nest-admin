import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './doc';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { RemoveSensitiveInfoInterceptor } from './shared/interceptors/remove-sensitive-info.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: false
  }))

  // 全局拦截器
  app.useGlobalInterceptors(new RemoveSensitiveInfoInterceptor())

  const uploadDir = (!!process.env.UPLOAD_DIR && process.env.UPLOAD_DIR !== '') ? process.env.UPLOAD_DIR : join(__dirname, '../../..', 'static/upload')
  app.useStaticAssets(uploadDir, {
    prefix: '/static/upload'
  })

  // 创建文档
  generateDocument(app);

  await app.listen(4399,'0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`swagger-ui：http://localhost:4399`);
  console.log(`   knife4j：http://localhost:4399/doc.html`);
}

bootstrap();
