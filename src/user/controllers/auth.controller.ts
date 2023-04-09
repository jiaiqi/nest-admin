import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
// import { BaseApiErrorResponse, SwaggerBaseApiResponse } from '../../shared/dtos/base-api-response.dto';
import { LoginDTO } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";
import { AuthGuard } from '@nestjs/passport'
import { RegisterCodeDTO, RegisterSMSDTO, UserInfoSuccessVO } from "../dtos/auth.dto";
import { ValidCaptchaDto } from "@/shared/dtos/valid-captcha.dto";
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
        const info = await this.authService.info(req.user.id)
        return {
            ok: 1,
            info
        }
    }

    @ApiOperation({
        summary: '生成图形验证码',
    })
    @Get('captcha')  //当请求该接口时，返回一张随机图片验证码
    async getCaptcha() {
        const data = await this.authService.getCaptcha()
        return {
            data
        }
    }

    @ApiOperation({
        summary: '模拟生成短信验证码（随机四位数字）',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        // type: SwaggerBaseApiResponse(UserInfoDto),
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        // type: BaseApiErrorResponse,
    })
    @Post('registerCode')
    async registerCode(@Body() registerCodeDto: RegisterCodeDTO,): Promise<any> {
        const code = await this.authService.registerCode(registerCodeDto)
        return {
            msg: '验证码已生成',
            data: { code }
        }
    }



    // @ApiOperation({
    //     summary: '校验图形验证码',
    // })
    // @Post('validCaptcha')  //当请求该接口时，返回一张随机图片验证码
    // async validCaptcha(@Body() req: ValidCaptchaDto) {
    //     const { id, text } = req
    //     const result = await this.authService.validCaptcha(id, text)
    //     return result
    // }

    @ApiOperation({
        summary: '短信用户注册/登录',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        // type: SwaggerBaseApiResponse(RegisterSMSDTO),
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        // type: BaseApiErrorResponse,
    })
    @Post('registerBySMS')
    async registerBySMS(
        @Body() registerDTO: RegisterSMSDTO
    ): Promise<UserInfoSuccessVO> {
        return this.authService.registerBySMS(registerDTO)
    }

}
