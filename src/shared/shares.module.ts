import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './configs/module-options';
import { DatabaseProvider } from './database.providers';
import { AppLoggerModule } from './logger/logger.module';
import { SystemService } from './system.service';
import { UploadService } from './upload/upload.service';
import { CaptchaService } from './captcha/captcha.service';

@Module({
  exports: [SystemService, ConfigModule, AppLoggerModule,
    ...DatabaseProvider, UploadService, CaptchaService],
  providers: [SystemService, ...DatabaseProvider, UploadService, CaptchaService],
  imports: [ConfigModule.forRoot(configModuleOptions), AppLoggerModule],
})
export class ShareModule { }
