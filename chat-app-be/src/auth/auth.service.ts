import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async auth(data: User) {
        const findUserByUsername = await this.usersService.findByUsername(data.username);

        if(findUserByUsername) {
            const isPasswordValid = await bcrypt.compare(data.password, findUserByUsername.password);
            if(!isPasswordValid) {
                throw new HttpException('Invalid Password', 400);
            }

            return this.generateToken({username: data.username});

        } else {
            const user = await this.usersService.create(data);
            return this.generateToken({username: user.username});
        }
        
    }

    private generateToken(payload: {username: string}): {username: string, access_token: string} {
        return {
            username: payload.username,
            access_token: this.jwtService.sign({
            username: payload.username,
        })}
    }
}
