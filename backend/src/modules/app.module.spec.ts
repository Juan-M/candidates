import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { CandidatesService } from '../services/candidates/candidates.service';

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should include AppController', () => {
    const appController = module.get<AppController>(AppController);
    expect(appController).toBeDefined();
  });

  it('should include AppService', () => {
    const appService = module.get<AppService>(AppService);
    expect(appService).toBeDefined();
  });

  it('should include CandidatesService', () => {
    const candidatesService = module.get<CandidatesService>(CandidatesService);
    expect(candidatesService).toBeDefined();
  });
});
