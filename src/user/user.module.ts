import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserProviders } from './user.providers';
import { ShareModule } from '@/shared/shares.module';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';

@Module({
  imports: [ShareModule],
  controllers: [UserController, RoleController],
  providers: [UserService, ...UserProviders, RoleService],
  exports: [UserService],
})
export class UserModule { }
