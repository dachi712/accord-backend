import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import passport from 'passport';
import { JwtModule } from '@nestjs/jwt';
import { register } from 'module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  imports: [UserModule,PassportModule,JwtModule.register({
    secret: process.env.JWT_SECRET || 'SUPER SECRET KEY',
    signOptions: {expiresIn: "1h"},
  })]
})
export class AuthModule {

}
