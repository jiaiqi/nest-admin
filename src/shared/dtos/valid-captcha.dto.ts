import { ApiPropertyOptional } from "@nestjs/swagger"

export class ValidCaptchaDto {
    @ApiPropertyOptional({
        description: '生成验证码接口返回的id',
        type: String,
        example: '7boSzaZ01UU=',
    })
    id: string

    @ApiPropertyOptional({
        description: '验证码内容',
        type: String,
        example: '1234',
    })
    text: string
}