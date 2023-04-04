import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './configs/module-options';
import { DatabaseProvider } from './database.providers';
import { AppLoggerModule } from './logger/logger.module';
import { SystemService } from './system.service';

@Module({
  exports: [SystemService, ConfigModule, AppLoggerModule, ...DatabaseProvider],
  providers: [SystemService, ...DatabaseProvider],
  imports: [ConfigModule.forRoot(configModuleOptions), AppLoggerModule],
})
export class ShareModule {}
