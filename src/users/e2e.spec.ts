import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import mongoose from 'mongoose';
import { AppModule } from '../../src/app.module';

describe('USERS (e2e)-TESTING', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    mongoose.disconnect();
  });

  const user = {
    id: mongoose.Types.ObjectId,
    name: 'aakasaah',
    fname: 'abcd',
    age: '22',
    address: 'Jind',
    department: 'IT',
  };

  // USER CREATION---------------------------------------------------------

  let userCreate;
  it('(Post)-)Register a new User', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201)
      .then((res) => {
        expect(res.body.token).toBeDefined;
        userCreate = res.body;
      });
  });

  //GET ALL USERS---------------------------------------------------------------

  it('(GET) -GET ALL USERS', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeDefined();
      });
  });

  //GET USER BY ID----------------------------------------------------------
  it('(Get)-GET BY ID', async () => {
    const Id = '6569c1885f3c1dcdcb6dc85e';
    return request(app.getHttpServer())
      .get(`/users/${Id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.name).toBeDefined();
      });
  });

  //GET USER BY ID-------------------------------

  it('(PUT)-PUT BY ID', async () => {
    const updateUSER = { name: 'UPDATED' };
    const Id = '6569bcb0195d5920e992d3ae';
    return request(app.getHttpServer())
      .put(`/users/${Id}`)
      .send(updateUSER)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.name).toEqual(updateUSER.name);
      });
  });

  // DELETE USER BY ID------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  it('(DELETE)-DELETE BY ID', async () => {
    const Id = '65702b2b2d485eec8cbab4ad';
    const response = await request(app.getHttpServer())
    .delete(`/users/${Id}`,
    );
    expect(response.status).toEqual(200);
  });
});
