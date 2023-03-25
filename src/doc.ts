import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as packageConfig from '../package.json'
import { knife4jSetup } from 'nest-knife4j'

export const generateDocument = app => {
    const options = new DocumentBuilder()
        .setTitle(packageConfig.name)
        .setDescription(packageConfig.description)
        .setVersion(packageConfig.version)
        .addBearerAuth() //jwt 允许token鉴权
        .build()

    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup('/api/doc', app, document)
    console.log(`swagger-ui文档地址：localhost:3000/api/doc`);

    knife4jSetup(app, [
        {
            name: '2.X版本',
            url: `/api/doc-json`,
            swaggerVersion: '2.0',
            location: `/api/doc-json`,
        },
    ])
    console.log(`knife4jSetup文档地址：localhost:3000/doc.html`);
}