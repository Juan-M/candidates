
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CandidatesService } from 'src/services/candidates/candidates.service';
import { CandidateDto } from 'src/DTOs/candidates/candidate.dto';
import { Candidate } from '@shared/models/candidate';

@ApiTags('candidate')
@Controller('candidate')
export class candidateController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        surname: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async handleCandidateParsing(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CandidateDto,
  ) {
    let json: Candidate;
    try {
      json = this.candidatesService.parseCandidate(body.name, body.surname, file)
    } catch (e) {
      throw new UnprocessableEntityException(e);
    } 
    return json;
  }
}
