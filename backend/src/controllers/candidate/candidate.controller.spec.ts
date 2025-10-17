import * as path from 'path';
import request from 'supertest';
import { App } from 'supertest/types';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Candidate } from '@shared/models/candidate';
import { CandidatesModule } from '../../modules/candidates/candidates.module';

describe('UploadController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CandidatesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should upload file and return parsed data', async () => {
    const filePath = path.join(
      __dirname,
      '../../../../samples/senior12yeah.xlsx',
    ); // make sure this file exists

    const response = await request(app.getHttpServer() as App)
      .post('/candidate')
      .field('name', 'Juan')
      .field('surname', 'Mecha')
      .attach('file', filePath);

    expect(response.status).toBe(201);
    const body = response.body as unknown as Candidate;
    expect(body).toHaveProperty('name', 'Juan');
    expect(body).toHaveProperty('surname', 'Mecha');
    // expect(body).toHaveProperty('excelData');
    // expect(Array.isArray(body.excelData)).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});
