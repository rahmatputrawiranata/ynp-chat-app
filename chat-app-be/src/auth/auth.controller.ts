import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService) {}

    @Post()
    async auth(@Body() data: User) {
        return await this.authService.auth(data);
    }
}
