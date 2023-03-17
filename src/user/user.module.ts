import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from 'src/shared/system.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SharedModule]
})
export class UserModule { }
