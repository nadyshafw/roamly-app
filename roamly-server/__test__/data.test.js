const request = require('supertest');
const { sequelize } = require('../models');
const app = require('../app');

const { hashPass } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

let access_token;

beforeAll(async () => {
    // Seeding user
    const user = [
      {
        username: "ixia",
        email: "hai@gmail.com",
        password: hashPass("12345"),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Seeding trip
    const trips = [
      {
        userId: 1,
        destination: "Bali",
        title: "Trip Bali",
        days: 2,
        startDate: "2026-11-05",
        budget: 3000000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await sequelize.queryInterface.bulkInsert('Users', user, {});
    await sequelize.queryInterface.bulkInsert('Trips', trips, {});

    // Seeding activity
    const activity = [
      {
        tripId: 1,
        title: "Nusa Penida",
        day: 1,
        note: "Seru dan menyenangkan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tripId: 1,
        title: "Pantai Kuta",
        day: 2,
        note: "Cantik dan indah",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await sequelize.queryInterface.bulkInsert('Activities', activity, {});

    const payload = {
        id: 1,
        email: 'hai@gmail.com'
    };

    access_token = signToken(payload);
});

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("Activities", null, {  truncate: true, cascade: true, restartIdentity: true });
    await sequelize.queryInterface.bulkDelete('Trips', null, {  truncate: true, cascade: true, restartIdentity: true });
    await sequelize.queryInterface.bulkDelete('Users', null, {  truncate: true, cascade: true, restartIdentity: true });

})

describe('PUT /login', () => {
    describe('PUT /login - success', () => {
        test('should return an object with access token', async () => {
            const body = { email: 'hai@gmail.com', password: '12345'}
            const response = await request(app)
                .post("/login")
                .send(body)

            // console.log(response);
            expect(response.status).toBe(200) // testing untuk codenya
            expect(response.body).toHaveProperty('access_token', expect.any(String))
        });
    });

    describe('POST /login - failed', () => {
        test('should return an object with error message', async () => {
            const body = { email: '', password: '12345'}
            const response = await request(app)
                .post("/login")
                .send(body)

            // console.log(response);
            expect(response.status).toBe(400) // testing untuk codenya
            expect(response.body).toHaveProperty('message', expect.any(String))
        });

        test('should return an object with error message', async () => {
            const body = { email: 'hai@gmail.com', password: ''}
            const response = await request(app)
                .post("/login")
                .send(body)

            // console.log(response);
            expect(response.status).toBe(400) // testing untuk codenya
            expect(response.body).toHaveProperty('message', expect.any(String))
        });

        test('should return an object with error message', async () => {
            const body = { email: 'ayohol@gmail.com', password: '12345'}
            const response = await request(app)
                .post("/login")
                .send(body)

            // console.log(response);
            expect(response.status).toBe(401) // testing untuk codenya
            expect(response.body).toHaveProperty('message', expect.any(String))
        });

        test('should return an object with error message', async () => {
            const body = { email: 'hai@gmail.com', password: '123456weds7890'}
            const response = await request(app)
                .post("/login")
                .send(body)

            // console.log(response);
            expect(response.status).toBe(401) // testing untuk codenya
            expect(response.body).toHaveProperty('message', expect.any(String))
        });
    });
});

describe('PUT /regis', () => {
    describe('PUT /regis - success', () => {
        test('should return an object', async () => {
            const body = { username: 'test1', email: 'test12@gmail.com', password: '1234567'}
            const response = await request(app)
                .post("/regis")
                .send(body)

            // console.log(response);
            expect(response.status).toBe(201) // testing untuk codenya
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    describe('POST /login - failed', () => {
        test('should return an object with error message', async () => {
            const body = { username: '', email: 'test12@gmail.com', password: '1234567'}
            const response = await request(app)
                .post("/regis")
                .send(body)

            // console.log(response);
            expect(response.status).toBe(400) // testing untuk codenya
            expect(response.body).toHaveProperty('message', expect.any(String))
        });

        test('should return an object with error message', async () => {
            const body = { username: 'test1', email: 'test12@gmail.com', password: ''}
            const response = await request(app)
                .post("/regis")
                .send(body)

            // console.log(response);
            expect(response.status).toBe(400) // testing untuk codenya
            expect(response.body).toHaveProperty('message', expect.any(String))
        });

        test('should return an object with error message', async () => {
            const body = { username: 'test1', email: '', password: '1234567'}
            const response = await request(app)
                .post("/regis")
                .send(body)

            // console.log(response);
            expect(response.status).toBe(400) // testing untuk codenya
            expect(response.body).toHaveProperty('message', expect.any(String))
        });

        test('should return an object with error message', async () => {
            const body = { username: 'test1', email: 'hai@gmailssa.com12w', password: '123456weds7890'}
            const response = await request(app)
                .post("/regis")
                .send(body)

            // console.log(response);
            expect(response.status).toBe(400) // testing untuk codenya
            expect(response.body).toHaveProperty('message', expect.any(String))
        });

        test('should return an object with error message', async () => {
            const body = { username: 'test1', email: 'hai@gmail.com', password: '123456weds7890'}
            const response = await request(app)
                .post("/regis")
                .send(body)

            // console.log(response);
            expect(response.status).toBe(400) // testing untuk codenya
            expect(response.body).toHaveProperty('message', expect.any(String))
        });
    });
});