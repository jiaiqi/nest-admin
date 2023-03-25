import { ApiPropertyOptional } from "@nestjs/swagger";


export class CreateUserDto {
    @ApiPropertyOptional({
        description: "手机号",
        type: String,
        example: '15191803240'
    })
    phone: string;

    @ApiPropertyOptional({
        description: "密码",
        type: String,
        example: '15191803240'
    })
    password: string;

    @ApiPropertyOptional({
        description: "邮箱",
        type: String,
        example: '2468260248@qq.com'
    })
    email: string;

    @ApiPropertyOptional({
        description: "用户名",
        type: String,
        example: 'jiaqi'
    })
    name: string;
}