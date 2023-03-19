import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from 'src/shared/shared.module';
// import { ConfigService } from '@nestjs/config';
import { UserProviders } from './user.providers';
import { MongoRepository } from 'typeorm';

@Module({
  controllers: [UserController],
  providers: [UserService, ...UserProviders, MongoRepository],
  // providers: [UserService, ConfigService,...UserProviders],
  imports: [SharedModule],
})
export class UserModule { }
