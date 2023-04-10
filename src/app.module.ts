import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CMSModule } from './cms/cms.module';
import { ResponseInterceptor } from '@/shared/interceptors/response.interceptors';

@Module({
  imports: [UserModule, CMSModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },],
})
export class AppModule { }

