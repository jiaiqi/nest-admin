import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserProviders } from './user.providers';
import { ShareModule } from '@/shared/shares.module';

@Module({
  imports: [ShareModule],
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
  exports: [UserService]
})
export class UserModule {}
