import { LoginDTO } from "../dtos/login.dto";
import { JwtService } from '@nestjs/jwt'
import { User } from "../entities/user.mongo.entity";
import { Inject, NotFoundException } from "@nestjs/common";
import { MongoRepository } from "typeorm";
import { encryptPassword } from "@/shared/utils/cryptogram.util";
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject("USER_REPOSITORY")
        private userRepository: MongoRepository<User>
    ) { }

    async certificate(user: User) {
        const payload = {
            id: user._id,
        }
        const token = this.jwtService.sign(payload)
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
}