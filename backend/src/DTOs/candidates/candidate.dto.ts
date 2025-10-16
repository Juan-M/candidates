
import { IsNotEmpty, IsString } from 'class-validator';

export class CandidateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;
}
