import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const salami = 'dd'



    
    console.log('saal');
    
    return 'Hello World!';
  }
}
