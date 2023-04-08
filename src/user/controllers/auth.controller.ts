import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
// import { BaseApiErrorResponse, SwaggerBaseApiResponse } from '../../shared/dtos/base-api-response.dto';
import { LoginDTO } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";
import { AuthGuard } from '@nestjs/passport'
@ApiTags('认证鉴权')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @ApiOperation({
        summary: '用户登录',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        // type: SwaggerBaseApiResponse(LoginDTO),
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        // type: BaseApiErrorResponse,
    })
    @Post('login')
    async login(
        @Body() loginDTO: LoginDTO
    ): Promise<any> {
        return this.authService.login(loginDTO)
    }

    @ApiOperation({
        summary: '获取当前用户信息',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        // type:SwaggerBaseApiResponse(User)
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        // type: BaseApiErrorResponse,
    })
    @ApiBearerAuth()
    @Get('info')
    @UseGuards(AuthGuard('jwt'))
    async info(@Req() req: any): Promise<any> {
        console.log('user id :', req.user.id);
        const info = await this.authService.info(req.user.id)
        return {
            ok: 1,
            info
        }
    }
}
