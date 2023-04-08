import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserProviders } from './user.providers';
import { ShareModule } from '@/shared/shares.module';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [ShareModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ShareModule
      ],
      useFactory: (configService: ConfigService) => configService.get('jwt')
    })
  ],
  controllers: [UserController, RoleController, AuthController],
  providers: [UserService, ...UserProviders, RoleService, AuthService],
  exports: [UserService],
})
export class UserModule { }
