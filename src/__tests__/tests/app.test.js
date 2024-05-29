const request = require('supertest');
const app = require('../../../app');
const db = require('../../models/db');
const sinon = require('sinon');
const { RESPONSE_STATUS_CODE } = require('../../util/constants');
const { ErrorType, ErrorMessage } = require('../../models/response');
const { hashPassword } = require('../../util/crypto');

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

afterAll(async () => {
    app.close()
    await db.sequelize.close()
})

describe('REGISTER', () => {
    const path = '/api/v1/auth/register'
    let getUserStub = null;
    afterEach(async () => {
        sinon.restore();
    });
    beforeEach(async () => {
        getUserStub = sinon.stub(db.User, 'findOne').resolves(null);
        sinon.stub(db.User, 'create').resolves(null);
    })
    describe('when register data is valid', () => {
        const payload = {
            username: 'username2',
            email: 'username2@example.com',
            password: 'username2pass123',
            phoneNumber: '0123456789',
            address: 'address2',
        }
        test('should return status code 200', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.CREATED);
        })
        test('should respond with \'username\' and \'email\'', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.body.data).toHaveProperty('username');
            expect(response.body.data).toHaveProperty('email');
        })
    })
    describe('when request data is invalid', () => {
        test('should return status code bad request 400', async () => {
            const payload = {
                username: '312jn',
                email: 'username3@com',
                password: '123',
            };
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.BAD_REQUEST);
        })
    })
    describe('when email already exists', () => {
        const user = {
            username: 'username3',
            email: 'username3@example.com',
            password: 'username3pass123',
            phoneNumber: '0123456789',
            address: 'address3',
        }
        const payload = {
            username: user.username,
            email: user.email,
            password: user.password,
        };
        beforeEach(async () => {
            getUserStub.callsFake((args1, args2) => {
                if (args1?.where?.email === user.email) {
                    return Promise.resolve(user)
                } else {
                    return Promise.resolve(null)
                }
            })
        })
        test('should return status code conflict 409', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.CONFLICT);
        })
        test('should respond with message '+ErrorMessage.ERROR_USER_EMAIL_USED, async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.body[0]).toHaveProperty('error');
            expect(response.body[0]).toHaveProperty('message');
            expect(response.body[0].error).toBe(ErrorType.ERROR_USER_REGISTER);
            expect(response.body[0].message).toBe(ErrorMessage.ERROR_USER_EMAIL_USED);
        })
    })
    describe('when username already exists', () => {
        const user = {
            username: 'username3',
            email: 'username3@example.com',
            password: 'username3pass123',
            phoneNumber: '0123456789',
            address: 'address3',
        }
        const payload = {
            username: user.username,
            email: user.email,
            password: user.password,
        };
        beforeEach(async () => {
            getUserStub.callsFake((args1, args2) => {
                if (args1?.where?.username === user.username) {
                    return Promise.resolve(user)
                } else {
                    return Promise.resolve(null)
                }
            })
        })
        test('should return status code conflict 409', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.CONFLICT);
        })
        test('should respond with message '+ErrorMessage.ERROR_USER_USERNAME_USED, async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.body[0]).toHaveProperty('error');
            expect(response.body[0]).toHaveProperty('message');
            expect(response.body[0].error).toBe(ErrorType.ERROR_USER_REGISTER);
            expect(response.body[0].message).toBe(ErrorMessage.ERROR_USER_USERNAME_USED);
        })
    })
})

describe('LOGIN', () => {
    const path = '/api/v1/auth/login'
    afterEach(async () => {
        sinon.restore();
    });
    beforeEach(async () => {
        getUserStub = sinon.stub(db.User, 'findOne').resolves(null);
        sinon.stub(db.User, 'create').resolves(null);
    })
    describe('when login data is valid', () => {
        beforeEach(async () => {
            const userData = {
                id: 1,
                email: 'testemail@gmail.com',
                password: await hashPassword('testpassword123'),
                phoneNumber: '0123456789',
                address: 'address',
                username: 'username',
            }
            getUserStub.callsFake((args1, args2) => {
                if (args1?.where?.email === 'testemail@gmail.com') {
                    return Promise.resolve(userData)
                } else {
                    return Promise.resolve(null)
                }
            })
        })
        const payload = {
            email: "testemail@gmail.com",
            password: "testpassword123"
        }
        test('should return status code 200', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
        })
        test('should respond with \'accessToken\'', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.body.data).toHaveProperty('accessToken');
        })
    })
    describe('when request data is invalid', () => {
        const payload = {
            email: 'testemail@gmail',
            password: '123'
        }
        test('should return status code bad request 400', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.BAD_REQUEST);
        })
        test('should respond with error response', async () => {
            const response = await request(app).post(path);
            expect(response.body[0]).toHaveProperty('error');
            expect(response.body[0]).toHaveProperty('message');
            expect(response.body[0].error).toBe(ErrorType.ERROR_USER_LOGIN);
        })
    })
    describe('when user not found', () => {
        payload = {
            email: 'testemail@gmail.com',
            password: 'testpassword123'
        }
        test('should return status code not found 404', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.NOT_FOUND);
        })
        test('should respond with error response', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.body[0]).toHaveProperty('error');
            expect(response.body[0]).toHaveProperty('message');
            expect(response.body[0].error).toBe(ErrorType.ERROR_USER_LOGIN);
            expect(response.body[0].message).toBe(ErrorMessage.ERROR_USER_NOT_FOUND);
        })
    })
    describe('when the password is not match', () => {
        beforeEach(async () => {
            const userData = {
                id: 1,
                email: 'testemail@gmail.com',
                password: await hashPassword('testpassword123'),
                phoneNumber: '0123456789',
                address: 'address',
                username: 'username',
            }
            getUserStub.callsFake((args1, args2) => {
                if (args1?.where?.email === 'testemail@gmail.com') {
                    return Promise.resolve(userData)
                } else {
                    return Promise.resolve(null)
                }
            })
        })
        payload = {
            email: 'testemail@gmail.com',
            password: 'wrongpassword123'
        }
        test('should return status code bad request 401', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.UNAUTHORIZED);
        })
        test('should respond with error response', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.body[0]).toHaveProperty('error');
            expect(response.body[0]).toHaveProperty('message');
            expect(response.body[0].error).toBe(ErrorType.ERROR_USER_LOGIN);
            expect(response.body[0].message).toBe(ErrorMessage.ERROR_INVALID_PASSWORD);
        })
    })
})

describe('MEDICINE', () => {
    const path = '/api/v1/medicines'
    describe('when get all medicines success',  () => {
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
    describe('when get all medicines with query params', () => {
        test('should return status code 200', async () => {
            const response = await request(app).get(path);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
        })
        test('should return an array of medicines', async () => {
            const response = await request(app).get(path).query({ categoryId: 3, isStock: 1 });
            expect(response.body.data).toHaveProperty('medicines');
            expect(Array.isArray(response.body.data.medicines)).toBe(true);
        })
    })
})
