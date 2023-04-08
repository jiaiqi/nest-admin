import { LoginDTO } from "../dtos/login.dto";
import { JwtService } from '@nestjs/jwt'
import { User } from "../entities/user.mongo.entity";
import { Inject, NotFoundException } from "@nestjs/common";
import { MongoRepository } from "typeorm";
import { encryptPassword, makeSalt } from "@/shared/utils/cryptogram.util";
import { RegisterCodeDTO, UserInfoDto } from "../dtos/auth.dto";
import { Role } from "../entities/role.mongo.entity";
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { CaptchaService } from '@/shared/captcha/captcha.service'
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject("USER_REPOSITORY")
        private userRepository: MongoRepository<User>,
        @Inject("ROLE_REPOSITORY")
        private roleRepository: MongoRepository<Role>,
        @InjectRedis()
        private readonly redis: Redis,
        private readonly captchaService:CaptchaService
    ) { }

    async certificate(user: User) {
        const payload = {
            id: user._id,
        }
        const token = this.jwtService.sign(payload)
        return token
    }

    async checkLoginForm(loginDTO: LoginDTO) {
        const { password, phone } = loginDTO
        const user = await this.userRepository.findOneBy({
            phone
        })
        if (!user) {
            throw new NotFoundException('用户不存在')
        }
        const { salt, password: dbPassword } = user
        const currentHashPassword = encryptPassword(password, salt)
        if (currentHashPassword !== dbPassword) {
            throw new NotFoundException('密码错误')
        }
        return user
    }


    async login(loginDTO: LoginDTO) {
        // 校验用户信息
        const user = await this.checkLoginForm(loginDTO)
        // 签发token
        const token = await this.certificate(user)
        return {
            data: {
                token
            }
        }

    }

    async info(id: string) {
        // 查询用户并获取权限
        const user = await this.userRepository.findOneBy(id)
        const data: UserInfoDto = Object.assign({}, user)
        if (user.role) {
            const role = await this.roleRepository.findOneBy(user.role)
            if (role) data.permissions = role.permissions
        }
        return data

    }


    /**
     * 获取验证码（四位随机数字）
     * @returns 
     */
    generateCode() {
        return [0, 0, 0, 0].map(() => (parseInt(Math.random() * 10 + ''))).join('')
    }
    /**
      * 获取短信验证码
      * @param mobile 
      */
    async registerCode(dto: RegisterCodeDTO) {

        const redisData = await this.getMobileVerifyCode(dto.phone);
        if (redisData !== null) {
            // 验证码未过期
            // 重复发送
            throw new NotFoundException('验证码未过期,无需再次发送')
        }

        // TODO 测试状态
        const code = this.generateCode()
        // const code = '0000'
        // this.logger.log(null, '生成验证码：' + code)
        console.log('生成验证码：' + code);

        await this.redis.set('verifyCode' + dto.phone, code, "EX", 60);

        return code
    }

    async getMobileVerifyCode(mobile) {
        return await this.redis.get('verifyCode' + mobile);
    }

    /**
 * 获取图形验证码
 */
    async getCaptcha() {
        const { data, text } = await this.captchaService.captche()
        const id = makeSalt(8)

        // this.logger.log(null, '图形验证码:' + text)

        // 验证码存入将Redis
        this.redis.set('captcha' + id, text, "EX", 600);

        const image = `data:image/svg+xml;base64,${Buffer.from(data).toString('base64')}`
        return { id, image }
    }


}
