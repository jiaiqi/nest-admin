import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from '@/shared/dtos/pagination-params.dto';

@Controller('user')
@ApiTags('用户管理')
export class UserController {
  constructor(private readonly userService: UserService,
    // 注入环境变量
    // private readonly configService: ConfigService
  ) { }

  @Post('/create')
  @ApiOperation({
    summary: '新增用户'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateUserDto
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
    type: [CreateUserDto]
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Get('')
  async findAll(@Query() query: PaginationParamsDto) {
    console.log(query)

    const { data, count } = await this.userService.findAll(query)
    return {
      data,
      meta: {
        total: count,
        pageSize: Number(query.pageSize),
        page: Number(query.page)
      }
    };
  }

  @ApiOperation({
    summary: '查找所有用户',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type:  [CreateUserDto]
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Post('/list')
  async findAll2(@Body() body: PaginationParamsDto) {
    const { data, count } = await this.userService.findAll(body)
    return {
      data,
      meta: {
        total: count,
        pageSize: Number(body.pageSize),
        page: Number(body.page)
      }
    };
  }

  @ApiOperation({
    summary: '查找单个用户'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateUserDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: CreateUserDto
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @ApiOperation({
    summary: '更新单个用户'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateUserDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: CreateUserDto
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() user: CreateUserDto) {
    return this.userService.update(id, user);
  }

  @ApiOperation({
    summary: '删除单个用户'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateUserDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: CreateUserDto
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}