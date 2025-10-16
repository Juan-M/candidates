
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CandidatesModule } from 'src/modules/candidates/candidates.module';
import * as path from 'path';

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
    const filePath = path.join(__dirname, 'test.xlsx'); // make sure this file exists

    const response = await request(app.getHttpServer())
      .post('/upload')
      .field('name', 'Juan')
      .field('surname', 'Mecha')
      .attach('file', filePath);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'Juan');
    expect(response.body).toHaveProperty('surname', 'Mecha');
    expect(response.body).toHaveProperty('excelData');
    expect(Array.isArray(response.body.excelData)).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});
