import * as XLSX from 'xlsx';
import { Injectable } from '@nestjs/common';
import { Candidate, Ranks } from '@shared/models/candidate';

@Injectable()
export class CandidatesService {

  parseCandidate(name, surname, file): Candidate {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    let seniority: Ranks;
    let years: number;
    let availability: boolean;
    try {
      if (sheet.A1.v === Ranks.SENIOR || sheet.A1.v === Ranks.JUNIOR) { // if number of keys would go up, this would become a little bit more pro
        seniority = sheet.A1.v ;
      } else {
        throw new Error('Value in the first cell (A1) has to be eigther one of junior or senior for the seniority');
      }
      years = sheet.B1.v; // TODO: we could add number validation the same way than for the enum
      availability = sheet.C1.v; // TODO: we could add boolean validation the same way than for the enum
    } catch (e) {
      throw `Could not read the file: ${e.message}`;
    }
    return {
      id: '0',
      name,
      surname,
      seniority,
      years,
      availability,
    }
  }
}
