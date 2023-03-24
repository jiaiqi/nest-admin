import { ApiPropertyOptional } from "@nestjs/swagger";

export class OrderParamsDto {
    @ApiPropertyOptional({
        description: "排序字段",
        type: String,
        example: 'createdAt'
    })
    field = 'createdAt';

    @ApiPropertyOptional({
        description: "排序方式",
        type: String,
        example: "DESC"
    })
    orderType = 'DESC';
}