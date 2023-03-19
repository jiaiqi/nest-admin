import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from 'src/shared/shared.module';
import { ConfigService } from '@nestjs/config';
import { UserProviders } from './user.providers';

@Module({
  controllers: [UserController],
  providers: [UserService, ConfigService,...UserProviders],
  imports: [SharedModule]
})
export class UserModule { }
