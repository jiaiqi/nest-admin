import { ApiPropertyOptional } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional({
    description: '手机号',
    type: String,
    example: '15191803240',
  })
  phone: string;

  @ApiPropertyOptional({
    description: '密码',
    type: String,
    example: '15191803240',
  })
  @Length(6, 16) //长度 6-16位
  password: string;

  @ApiPropertyOptional({
    description: '邮箱',
    type: String,
    example: '2468260248@qq.com',
  })
  email: string;

  @ApiPropertyOptional({
    description: '用户名',
    type: String,
    example: 'jiaqi',
  })
  name: string;

  // 加盐
  salt: string
}
