import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

type meta = {
  current: number
  size: number
  total: number
}

export class BaseApiResponse<T> {
  // 返回的数据
  public data: T; // Swagger Decorator is added in the extended class below, since that will override this one.

  // 分页信息
  @ApiProperty({ type: Object,example:{current:1,size:10,total:15} })
  public meta: meta;

  @ApiProperty({ type: Number,example:200 })
  public statusCode: number;

  @ApiProperty({ type: String,example:'操作成功' })
  public message: string;
}

export function SwaggerBaseApiResponse<T>(type: T): typeof BaseApiResponse {
  class ExtendedBaseApiResponse<T> extends BaseApiResponse<T> {
    @ApiProperty({ type })
    public data: T;
  }
  // NOTE : Overwrite the returned class name, otherwise whichever type calls this function in the last,
  // will overwrite all previous definitions. i.e., Swagger will have all response types as the same one.
  const isAnArray = Array.isArray(type) ? ' [ ] ' : '';
  Object.defineProperty(ExtendedBaseApiResponse, 'name', {
    value: `SwaggerBaseApiResponseFor ${type} ${isAnArray}`,
  });

  return ExtendedBaseApiResponse;
}

export class BaseApiErrorObject {
  @ApiProperty({ type: Number })
  public statusCode: number;

  @ApiProperty({ type: String })
  public message: string;

  @ApiPropertyOptional({ type: String })
  public localizedMessage: string;

  @ApiProperty({ type: String })
  public errorName: string;

  @ApiProperty({ type: Object })
  public details: unknown;

  @ApiProperty({ type: String })
  public path: string;

  @ApiProperty({ type: String })
  public requestId: string;

  @ApiProperty({ type: String })
  public timestamp: string;
}

export class BaseApiErrorResponse {
  @ApiProperty({ type: BaseApiErrorObject })
  public error: BaseApiErrorObject;
}