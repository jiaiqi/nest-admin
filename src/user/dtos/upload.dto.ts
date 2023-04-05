import { ApiProperty } from "@nestjs/swagger";


export class UploadDTO {
    @ApiProperty({
        example: 'xxx文件'
    })
    name: string

    @ApiProperty({
        type: 'string',
        format: 'binary',
        
    })
    file: Express.Multer.File
}