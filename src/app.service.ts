import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello there! This could be the FRONTEND, BUT hey, we are working on the BACKEND today!';
  }
}
