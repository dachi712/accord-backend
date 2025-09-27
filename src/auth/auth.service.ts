import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const { password, ...result } = user;
    return result;
  }
async login(username: string, password: string) {
  const user = await this.userService.findOneByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedException("Invalid Credentials");
  }

  const payload = { sub: user.id, username: user.userName, role: user.role };
  return { access_token: this.jwtService.sign(payload) };
}
    
}
