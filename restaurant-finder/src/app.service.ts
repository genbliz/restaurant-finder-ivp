import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthInfo(): string {
    return 'Hello World! App working';
  }
}
