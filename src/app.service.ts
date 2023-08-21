import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getNameServer(): string {
    return 'MyMoney API';
  }
}
