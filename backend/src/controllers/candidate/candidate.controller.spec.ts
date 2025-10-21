import { Test, TestingModule } from '@nestjs/testing';
import { candidateController } from './candidate.controller';
import { CandidatesService } from '../../services/candidates/candidates.service';
import { UnprocessableEntityException } from '@nestjs/common';
import { CandidateDto } from '../../DTOs/candidates/candidate.dto';
import { Candidate, Ranks } from '@shared/models/candidate';

describe('candidateController', () => {
  let controller: candidateController;
  let service: CandidatesService;

  const mockCandidatesService = {
    parseCandidate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [candidateController],
      providers: [
        {
          provide: CandidatesService,
          useValue: mockCandidatesService,
        },
      ],
    }).compile();

    controller = module.get<candidateController>(candidateController);
    service = module.get<CandidatesService>(CandidatesService);
  });

  it('should return parsed candidate on success', () => {
    const mockFile = {
      buffer: Buffer.from('mock file content'),
    } as Express.Multer.File;
    const mockBody: CandidateDto = { name: 'John', surname: 'Doe' };
    const mockCandidate: Candidate = {
      id: '0mocks',
      name: 'John',
      surname: 'Doe',
      seniority: 'senior' as Ranks,
      years: 12,
      availability: true,
    };

    mockCandidatesService.parseCandidate.mockReturnValue(mockCandidate);

    const result = controller.handleCandidateParsing(mockFile, mockBody);
    expect(result).toEqual(mockCandidate);
    expect(service.parseCandidate).toHaveBeenCalledWith(
      'John',
      'Doe',
      mockFile,
    );
  });

  it('should throw UnprocessableEntityException on parse error', () => {
    const mockFile = {
      buffer: Buffer.from('invalid file'),
    } as Express.Multer.File;
    const mockBody: CandidateDto = { name: 'Jane', surname: 'Smith' };

    mockCandidatesService.parseCandidate.mockImplementation(() => {
      throw new Error('Parse error');
    });

    expect(() => controller.handleCandidateParsing(mockFile, mockBody)).toThrow(
      UnprocessableEntityException,
    );
  });
});
