import * as XLSX from 'xlsx';
import { Ranks } from '@shared/models/candidate';
import { CandidatesService } from './candidates.service';

jest.mock('xlsx');
jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => 'mocked-uuid'),
}));
jest.mock('@shared/models/candidate', () => ({
  Ranks: {
    JUNIOR: 'junior',
    SENIOR: 'senior',
  },
}));

describe('CandidatesService', () => {
  let service: CandidatesService;

  beforeEach(() => {
    service = new CandidatesService();
  });

  it('should parse valid Excel data correctly', () => {
    const mockSheet = {
      A1: { v: 'senior' as Ranks },
      B1: { v: 5 },
      C1: { v: true },
    };
    const mockWorkbook = {
      SheetNames: ['Sheet1'],
      Sheets: { Sheet1: mockSheet },
    };
    (XLSX.read as jest.Mock).mockReturnValue(mockWorkbook);

    const mockFile = { buffer: Buffer.from([]) } as Express.Multer.File;
    const result = service.parseCandidate('John', 'Doe', mockFile);

    expect(result).toEqual({
      id: 'mocked-uuid',
      name: 'John',
      surname: 'Doe',
      seniority: 'senior' as Ranks,
      years: 5,
      availability: true,
    });
  });

  it('should throw error for invalid seniority value', () => {
    const mockSheet = {
      A1: { v: 'INVALID' },
      B1: { v: 5 },
      C1: { v: true },
    };
    const mockWorkbook = {
      SheetNames: ['Sheet1'],
      Sheets: { Sheet1: mockSheet },
    };
    (XLSX.read as jest.Mock).mockReturnValue(mockWorkbook);

    const mockFile = { buffer: Buffer.from([]) } as Express.Multer.File;

    expect(() => service.parseCandidate('Jane', 'Smith', mockFile)).toThrow(
      'Could not read the file: Value in the first cell (A1) has to be eigther one of junior or senior for the seniority',
    );
  });
});
