import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWorking(): string {
    return "Yes, you have reached The Backend. This is working! (but don't get used to it!)";
  }
}
