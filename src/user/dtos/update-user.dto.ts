import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        example: '15191803240'
    })
    phoneNumber: string;

    @ApiProperty({
        example: 'lyciloveu'
    })
    password: string;

    @ApiProperty({
        example: '2468260248@qq.com'
    })
    email: string;

    @ApiProperty({
        example: 'jiaqi'
    })
    name: string;
}
