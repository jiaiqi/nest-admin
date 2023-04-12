import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  Query,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UserInfoDto } from '../dtos/user.dto';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from '@/shared/dtos/pagination-params.dto';
import { QueryBodyDto } from '@/shared/dtos/query-body-dto';
import { UploadDTO } from '../dtos/upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { encryptFileMD5 } from '@/shared/utils/cryptogram.util';
import { BaseApiErrorResponse, SwaggerBaseApiResponse } from '@/shared/dtos/base-api-response.dto';

@Controller('user')
@ApiTags('用户管理')
export class UserController {
  constructor(
    private readonly userService: UserService, // 注入环境变量 // private readonly configService: ConfigService
  ) { }

  @Post('/create')
  @ApiOperation({
    summary: '新增用户',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type:BaseApiErrorResponse
  })
  create(@Body() user: CreateUserDto) {
    console.log(user);
    return this.userService.create(user);
  }

  @ApiOperation({
    summary: '查找所有用户',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([UserInfoDto]),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type:BaseApiErrorResponse
  })
  @Get('')
  async findAll(@Query() query: PaginationParamsDto) {
    console.log(query);

    const { data, count } = await this.userService.findAll(query);
    return {
      data,
      meta: {
        total: count,
        size: Number(query.size),
        page: Number(query.page),
      },
    };
  }

  @ApiOperation({
    summary: '查找所有用户',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([UserInfoDto]),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type:BaseApiErrorResponse
  })
  @Post('/list')
  async findAll2(@Body() body: QueryBodyDto) {
    const { page } = body;
    const { data, count } = await this.userService.findAll2(body);
    return {
      data,
      page: {
        total: count,
        size: Number(page.size),
        page: Number(page.page),
      },
    };
  }

  @ApiOperation({
    summary: '查找单个用户',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @ApiOperation({
    summary: '更新单个用户',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: CreateUserDto) {
    const data = await this.userService.update(id, user);
    return {
      data,
      status: 'success',
    };
  }

  @ApiOperation({
    summary: '删除单个用户',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    type: CreateUserDto,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  @Post('/upload')
  @ApiOperation({
    summary: '上传文件',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Req() req: any,
    @Body() uploadDto: UploadDTO,
    @UploadedFile() file
  ) {
    console.log('upload,', file);
    console.log('hash:', encryptFileMD5(file.buffer));
    return this.userService.uploadAvatar(file)
  }
}
