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
import { Candidate } from '@shared/models/candidate';
import { CandidatesService } from '../../services/candidates/candidates.service';
import { CandidateDto } from '../../DTOs/candidates/candidate.dto';

@ApiTags('candidate')
@Controller('candidate')
export class CandidateController {
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
  handleCandidateParsing(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CandidateDto,
  ) {
    let json: Candidate;
    try {
      json = this.candidatesService.parseCandidate(
        body.name,
        body.surname,
        file,
      );
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
    return json;
  }
}
