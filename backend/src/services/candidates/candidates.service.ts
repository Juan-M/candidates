import { Injectable } from '@nestjs/common';
import { Candidate } from '@shared/models/candidate';

@Injectable()
export class CandidatesService {

  parseCandidate(name, surname, excelData): Candidate {
    // parsing logic here with validation
    return {
      id: '0',
      name,
      surname,
      seniority: excelData.seniority,
      years: excelData.years,
      availability: excelData.availability,
    }
  }
}
