import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    if(5 > 2){
      return "hello";
    }
    else return "alioo"
  }
}
