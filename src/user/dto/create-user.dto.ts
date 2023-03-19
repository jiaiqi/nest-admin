import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
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
