import { ApiPropertyOptional } from '@nestjs/swagger';

export class OrderParamsDto {
  @ApiPropertyOptional({
    description: '排序字段',
    type: String,
    example: 'createAt',
  })
  field = 'createAt';

  @ApiPropertyOptional({
    description: '排序方式',
    type: String,
    example: 'DESC',
  })
  orderType = 'DESC';
}
