import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptCompareSync} from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    singIn(username: string, password: string): AuthResponseDto{
        const foundUser = this.usersService.findByUserName(username);

        //comparando se o usuario existe ou se a senha que está vindo bate com a senha certa
        if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: foundUser.id, username: foundUser.username}

        //criando o token com o payload
        const token = this.jwtService.sign(payload);

        
    }
}
