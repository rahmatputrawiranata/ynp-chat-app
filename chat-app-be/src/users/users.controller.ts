import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() data: User) {
        return await this.usersService.create(data);
    }

}
