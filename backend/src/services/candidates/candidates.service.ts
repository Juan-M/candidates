import * as XLSX from 'xlsx';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Candidate, Ranks } from '@shared/models/candidate';
import { AgreedSheet } from '@shared/models/sheetFormat';

@Injectable()
export class CandidatesService {
  parseCandidate(
    name: string,
    surname: string,
    file: Express.Multer.File,
  ): Candidate {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName] as unknown as AgreedSheet;
    let seniority: Ranks;
    let years: number;
    let availability: boolean;
    try {
      if (sheet.A1.v === Ranks.SENIOR || sheet.A1.v === Ranks.JUNIOR) {
        // as the number of keys would go up, this would become a little bit more pro
        seniority = sheet.A1.v;
      } else {
        throw new Error(
          'Value in the first cell (A1) has to be eigther one of junior or senior for the seniority',
        );
      }
      years = sheet.B1.v; // TODO: we could add number validation the same way than for the enum
      availability = sheet.C1.v; // TODO: we could add boolean validation the same way than for the enum
      // TODO: OR we could create a class DTO with class-validator for the file
    } catch (e) {
      throw new Error(`Could not read the file: ${(e as Error).message}`);
    }
    return {
      id: randomUUID(),
      name,
      surname,
      seniority,
      years,
      availability,
    };
  }
}
