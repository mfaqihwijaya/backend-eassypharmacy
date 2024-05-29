const request = require('supertest');
const app = require('../../../app');
const db = require('../../models/db');
const { RESPONSE_STATUS_CODE } = require('../../util/constants');
const { validLoginPayloads } = require('../helper/auth');

beforeAll(async () => {
    try {
        await db.sequelize.authenticate()
        console.log('Successfully connect to database!');
    } catch (error) {
        console.log('Failed to connect to database!');
        console.log(error)
        process.exit(1);
    }
})

describe('LOGIN', () => {
    const path = '/api/v1/auth/login'
    describe('when login data is valid', () => {
        test('should return status code 200', async () => {
            const payloads = validLoginPayloads;
            for (const payload of payloads) {
                const response = await request(app).post(path).send(payload);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            }
        })
        test('should respond with \'accessToken\'', async () => {
            const payloads = validLoginPayloads
            for (const payload of payloads) {
                const response = await request(app).post(path).send(payload);
                expect(response.body.data).toHaveProperty('accessToken');
            }
        })
    })
})

describe('MEDICINE', () => {
    const path = '/api/v1/medicines'
    describe('when get all medicines with no params', () => {
        test('should return status code 200', async () => {
            const response = await request(app).get(path);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
        })
        test('should return an array of medicines', async () => {
            const response = await request(app).get(path);
            expect(response.body.data).toHaveProperty('medicines');
            expect(Array.isArray(response.body.data.medicines)).toBe(true);
        })
    })
})
