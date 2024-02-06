import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'utils';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: JWT_SECRET,
    
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
