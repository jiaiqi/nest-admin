import { CommonDTO } from '@/shared/dtos/common.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

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

  @ApiProperty({ example: 'xxx.png', description: '头像' })
  @IsNotEmpty()
  avatar?: string;

  @ApiProperty({ example: 'frontend', description: '工作' })
  @IsNotEmpty()
  job?: string;

  @ApiProperty({ example: '前端开发工程师', description: '工作岗位' })
  @IsNotEmpty()
  jobName?: string;

  @ApiProperty({ example: 'M78星云', description: '组织机构' })
  @IsNotEmpty()
  organization?: string;

  @ApiProperty({ example: '西安', description: '位置' })
  @IsNotEmpty()
  location?: string;

  @ApiProperty({ example: 'xxx.com', description: '个人主页' })
  @IsNotEmpty()
  personalWebsite?: string;

  @ApiProperty({ example: '637855e9e8c408970ef9f4de', description: '角色' })
  role?;

  // 加盐
  salt: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {

}

export class UserInfoDto extends CommonDTO {
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

  @ApiProperty({ example: 'xxx.png', description: '头像', type: String })
  @IsNotEmpty()
  avatar?: string;

  @ApiProperty({ example: 'frontend', description: '工作', type: String })
  @IsNotEmpty()
  job?: string;

  @ApiProperty({ example: '前端开发工程师', description: '工作岗位', type: String })
  @IsNotEmpty()
  jobName?: string;

  @ApiProperty({ example: 'M78星云', description: '组织机构', type: String })
  @IsNotEmpty()
  organization?: string;

  @ApiProperty({ example: '西安', description: '位置', type: String })
  @IsNotEmpty()
  location?: string;

  @ApiProperty({ example: 'xxx.com', description: '个人主页', type: String })
  @IsNotEmpty()
  personalWebsite?: string;

  @ApiProperty({ example: '637855e9e8c408970ef9f4de', description: '角色', type: String })
  role?;

  // 加盐
  salt: string
}



