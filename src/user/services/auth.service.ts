import { LoginDTO } from "../dtos/login.dto";
import { JwtService } from '@nestjs/jwt'
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    login(loginDTO: LoginDTO) {
        // 签发token

    }
}