import { Module } from '@nestjs/common';
import { CandidateController } from '../../controllers/candidate/candidate.controller';
import { CandidatesService } from '../../services/candidates/candidates.service';

@Module({
  controllers: [CandidateController],
  providers: [CandidatesService],
})
export class CandidatesModule {}
