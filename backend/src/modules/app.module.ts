import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { CandidatesModule } from './candidates/candidates.module';
import { CandidatesService } from '../services/candidates/candidates.service';

@Module({
  imports: [CandidatesModule],
  controllers: [AppController],
  providers: [AppService, CandidatesService],
})
export class AppModule {}
