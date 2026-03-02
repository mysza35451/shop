import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import { AppModule } from '../src/app.module';

describe('BFF e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.ADMIN_USER = 'admin';
    process.env.ADMIN_PASS = 'admin123';
    process.env.USE_EXTERNAL_BACKEND = 'false';
    process.env.PERSISTENCE = 'memory';

    const moduleFixture = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates lead publicly then fetches as admin', async () => {
    const created = await request(app.getHttpServer()).post('/api/v1/leads').send({
      customerName: 'Daisy',
      contactEmail: 'daisy@example.com',
      postcode: 'QW12',
      serviceType: 'other',
      description: 'Need help with odd jobs around property',
      photoUrls: [],
    });
    expect(created.status).toBe(201);

    const login = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ username: 'admin', password: 'admin123' });

    const cookie = login.headers['set-cookie'];
    const list = await request(app.getHttpServer()).get('/api/v1/leads').set('Cookie', cookie);
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);
  });
});
