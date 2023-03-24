import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, Min } from "class-validator";
import { Transform } from 'class-transformer'
class WhereParams {

}
class OrderParams {
    // @ApiPropertyOptional({
    //     description: "排序字段",
    //     type: String,
    //     example: 'createdAt'
    // })
    // column = 'createdAt';

    // @ApiPropertyOptional({
    //     description: "排序方式",
    //     type: String,
    //     example: "DESC"
    // })
    // type = 'DESC';
}

class PageParams {
    @ApiPropertyOptional({
        description: "每页条数，默认为5",
        type: Number,
        example: 5
    })
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    size = 5;

    @ApiPropertyOptional({
        description: "当前页,默认为1",
        type: Number,
        example: 1
    })
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    current = 1;
}

export class QueryBodyDto {
    @ApiPropertyOptional({
        description: "查询条件",
        type: Object,
        example: {
            name:'jiaqi'
        }
    })
    where: WhereParams

    @ApiPropertyOptional({
        description: "分页参数",
        type: Object,
        example: {
            current: 1,
            size: 5
        }
    })
    page: PageParams

    @ApiPropertyOptional({
        description: "排序参数",
        type: Object,
        example: {
            createdAt: "ASC"
        }
    })
    order: OrderParams
}