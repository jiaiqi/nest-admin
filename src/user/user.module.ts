import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { SharedModule } from 'src/shared/shared.module';
import { ConfigService } from '@nestjs/config';
import { UserProviders } from './user.providers';
import { AppLogger } from 'src/shared/logger/logger.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ...UserProviders, AppLogger,ConfigService],
  // providers: [UserService, ConfigService,...UserProviders],
  imports: [SharedModule],
  exports:[UserService,...UserProviders]
})
export class UserModule {}
