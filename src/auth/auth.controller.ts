import { Controller ,Post,Body, Get,UseGuards,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { request } from 'http';
import { JwtAuthGuard } from './jwt.guard';


@Controller('auth')
export class AuthController {
    constructor(private authservice:AuthService){}

    @Post('register')
    register(@Body()body:{userName : string, password: string ,email :string }){
        return this.authservice.register(body)
    }

    @Post('login')
    login(@Body()body:{username: string,password: string}){
        return this.authservice.login(body.username,body.password)
    }
    @UseGuards(JwtAuthGuard)
    @Get("profile")
    profile(@Request()req){
        return req.user
    }

}

