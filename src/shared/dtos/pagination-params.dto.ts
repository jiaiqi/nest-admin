import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationParamsDto {
  @ApiPropertyOptional({
    description: '每页条数，默认为5',
    type: Number,
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  size = 5;

  @ApiPropertyOptional({
    description: '当前页,默认为1',
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  page = 1;
}

export class PaginationParams2Dto {
  @ApiPropertyOptional({
    description: 'Optional, defaults to 100',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit = 100;

  @ApiPropertyOptional({
    description: 'Optional, defaults to 0',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  offset = 0;
}
