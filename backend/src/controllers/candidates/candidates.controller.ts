
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidatesService } from 'src/services/candidates/candidates.service';
import * as XLSX from 'xlsx';

@Controller('candidates')
export class candidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handleCandidatesParsing(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
    @Body('surname') surname: string,
  ) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excelData = XLSX.utils.sheet_to_json(sheet);

    return this.candidatesService.parseCandidate(name, surname, excelData);
  }
}
