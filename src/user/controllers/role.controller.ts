import { PaginationParamsDto } from "@/shared/dtos/pagination-params.dto";
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateRoleDto } from "../dtos/role.dto";
import { RoleService } from "../services/role.service";

@Controller('role')
@ApiTags('角色管理')
export class RoleController {
    constructor(
        private readonly RoleService: RoleService
    ) { }

    @ApiOperation({
        summary: "新增角色"
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: CreateRoleDto
    })
    @Post('')
    create(@Body() Role: CreateRoleDto) {
        return this.RoleService.create(Role)
    }

    @ApiOperation({
        summary: '查找所有角色',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: [CreateRoleDto],
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        // type: BaseApiErrorResponse,
    })
    @Get()
    async findAll(
        @Query() query: PaginationParamsDto
    ) {
        // console.log(query)
        const { data, count } = await this.RoleService.findAll(query);
        return {
            data,
            meta: { total: count }
        }
    }

    @ApiOperation({
        summary: '查找单个角色',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: CreateRoleDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        // type: BaseApiErrorResponse,
    })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return {
            data: await this.RoleService.findOne(id)
        }
    }

    @ApiOperation({
        summary: '更新单个角色',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: CreateRoleDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        // type: BaseApiErrorResponse,
    })
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateCourseDto: CreateRoleDto) {
        return {
            data: await this.RoleService.update(id, updateCourseDto)
        }
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: '删除单个角色',
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
    })
    @ApiBearerAuth()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.RoleService.remove(id);
    }

}