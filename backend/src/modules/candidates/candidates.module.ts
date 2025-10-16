import { Module } from '@nestjs/common';
import { candidateController } from 'src/controllers/candidate/candidate.controller';
import { CandidatesService } from 'src/services/candidates/candidates.service';

@Module({
  controllers: [candidateController],
  providers: [CandidatesService], 
})
export class CandidatesModule {}
