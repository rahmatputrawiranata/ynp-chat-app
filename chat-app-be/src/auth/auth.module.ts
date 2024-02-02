import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: 'do-not-use-this-in-production',
    
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
