import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @ApiProperty({
  //     example: '15191803240'
  // })
  // phone: string;
  // @ApiProperty({
  //     example: 'goudaner'
  // })
  // password: string;
  // @ApiProperty({
  //     example: '2468260248@qq.com'
  // })
  // email: string;
  // @ApiProperty({
  //     example: 'jiaqi'
  // })
  // name: string;
}
