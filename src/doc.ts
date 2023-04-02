import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as packageConfig from '../package.json';
import { knife4jSetup } from 'nest-knife4j';

export const generateDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .setExternalDoc('knife4j文档地址', '/doc.html')
    .addBearerAuth() //jwt 允许token鉴权
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/doc', app, document);

  knife4jSetup(app, [
    {
      name: packageConfig.version,
      url: `/api/doc-json`,
      swaggerVersion: '3.0',
      location: `/api/doc-json`,
    },
  ]);
};
