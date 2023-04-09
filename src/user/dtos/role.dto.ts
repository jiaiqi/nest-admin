import { IdDTO } from "@/shared/dtos/id.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {

    @ApiProperty({
        example:'admin'
    })
    @IsNotEmpty()
    name:string

    @ApiProperty({
        example:{
            user:[
                'read',
                'white'
            ]
        }
    })
    @IsNotEmpty()
    permissions:object
}