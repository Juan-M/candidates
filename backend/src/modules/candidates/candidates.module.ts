import { Module } from '@nestjs/common';
import { candidateController } from '../../controllers/candidate/candidate.controller';
import { CandidatesService } from '../../services/candidates/candidates.service';

@Module({
  controllers: [candidateController],
  providers: [CandidatesService],
})
export class CandidatesModule {}
