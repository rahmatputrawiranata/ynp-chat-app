import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    @InjectModel(User.name) private model: Model<UserDocument>;

    async create(user: User) {
        let isUserValid = false
        isUserValid = !!(await this.findByUsername(user.username));
        if (isUserValid) {
            throw new HttpException('Username Already Exists', HttpStatus.BAD_REQUEST);
        }

        const isPasswordValid = user.password.length >= 8;

        if(!isPasswordValid) {
            throw new HttpException('Password must be at least 8 characters long', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        
        return this.model.create(user);
    }

    find(id: string) {
        return this.model.findById(id)
    }

    async findByUsername(username: string) {
        return this.model.findOne({username})
    }
}
