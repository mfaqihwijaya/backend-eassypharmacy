const request = require('supertest');
const app = require('../../../app');
const db = require('../../models/db');
const sinon = require('sinon');
const { RESPONSE_STATUS_CODE } = require('../../util/constants');
const { ErrorType, ErrorMessage } = require('../../models/response');
const { hashPassword } = require('../../util/crypto');
const { medicines, emptyMedicineOrder } = require('../helper/constant');

const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImlhdCI6MTcxNjY3NzQwMDc4NH0.P3BXm9C_ZXQzo9rqH8w87rulRXizi6s_CdAld4tJVpE';

beforeAll(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Successfully connect to database!');
    } catch (error) {
        console.log('Failed to connect to database!');
        console.log(error);
        process.exit(1);
    }
});

afterAll(async () => {
    app.close();
    await db.sequelize.close();
});

describe('REGISTER', () => {
    const path = '/api/v1/auth/register';
    let getUserStub = null;
    afterEach(async () => {
        sinon.restore();
    });
    beforeEach(async () => {
        getUserStub = sinon.stub(db.User, 'findOne').resolves(null);
        sinon.stub(db.User, 'create').resolves(null);
    });
    describe('when register data is valid', () => {
        const payload = {
            username: 'username2',
            email: 'username2@example.com',
            password: 'username2pass123',
            phoneNumber: '0123456789',
            address: 'address2',
        };
        test('should return status code 200', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.CREATED);
        });
        test("should respond with 'username' and 'email'", async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.body.data).toHaveProperty('username');
            expect(response.body.data).toHaveProperty('email');
        });
    });
    describe('when request data is invalid', () => {
        test('should return status code bad request 400', async () => {
            const payload = {
                username: '312jn',
                email: 'username3@com',
                password: '123',
            };
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.BAD_REQUEST);
        });
    });
    describe('when email already exists', () => {
        const user = {
            username: 'username3',
            email: 'username3@example.com',
            password: 'username3pass123',
            phoneNumber: '0123456789',
            address: 'address3',
        };
        const payload = {
            username: user.username,
            email: user.email,
            password: user.password,
        };
        beforeEach(async () => {
            getUserStub.callsFake((args1, args2) => {
                if (args1?.where?.email === user.email) {
                    return Promise.resolve(user);
                } else {
                    return Promise.resolve(null);
                }
            });
        });
        test('should return status code conflict 409', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.CONFLICT);
        });
        test(
            'should respond with message ' + ErrorMessage.ERROR_USER_EMAIL_USED,
            async () => {
                const response = await request(app).post(path).send(payload);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].error).toBe(
                    ErrorType.ERROR_USER_REGISTER
                );
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_USER_EMAIL_USED
                );
            }
        );
    });
    describe('when username already exists', () => {
        const user = {
            username: 'username3',
            email: 'username3@example.com',
            password: 'username3pass123',
            phoneNumber: '0123456789',
            address: 'address3',
        };
        const payload = {
            username: user.username,
            email: user.email,
            password: user.password,
        };
        beforeEach(async () => {
            getUserStub.callsFake((args1, args2) => {
                if (args1?.where?.username === user.username) {
                    return Promise.resolve(user);
                } else {
                    return Promise.resolve(null);
                }
            });
        });
        test('should return status code conflict 409', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.CONFLICT);
        });
        test(
            'should respond with message ' +
                ErrorMessage.ERROR_USER_USERNAME_USED,
            async () => {
                const response = await request(app).post(path).send(payload);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].error).toBe(
                    ErrorType.ERROR_USER_REGISTER
                );
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_USER_USERNAME_USED
                );
            }
        );
    });
    describe('when database request fail', () => {
        beforeEach(async () => {
            getUserStub.throws(new Error('error database'));
        });
        const payload = {
            username: 'username2',
            email: 'username2@example.com',
            password: 'username2pass123',
            phoneNumber: '0123456789',
            address: 'address2',
        };
        test('should return status code internal server error 500', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(
                RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        });
        test('should respond with error response', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.body[0]).toHaveProperty('error');
            expect(response.body[0]).toHaveProperty('message');
            expect(response.body[0].error).toBe(ErrorType.ERROR_USER_REGISTER);
        });
    });
});

describe('LOGIN', () => {
    const path = '/api/v1/auth/login';
    afterEach(async () => {
        sinon.restore();
    });
    beforeEach(async () => {
        getUserStub = sinon.stub(db.User, 'findOne').resolves(null);
        sinon.stub(db.User, 'create').resolves(null);
    });
    describe('when login data is valid', () => {
        beforeEach(async () => {
            const userData = {
                id: 1,
                email: 'testemail@gmail.com',
                password: await hashPassword('testpassword123'),
                phoneNumber: '0123456789',
                address: 'address',
                username: 'username',
            };
            getUserStub.callsFake((args1, args2) => {
                if (args1?.where?.email === 'testemail@gmail.com') {
                    return Promise.resolve(userData);
                } else {
                    return Promise.resolve(null);
                }
            });
        });
        const payload = {
            email: 'testemail@gmail.com',
            password: 'testpassword123',
        };
        test('should return status code 200', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
        });
        test("should respond with 'accessToken'", async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.body.data).toHaveProperty('accessToken');
        });
    });
    describe('when request data is invalid', () => {
        const payload = {
            email: 'testemail@gmail',
            password: '123',
        };
        test('should return status code bad request 400', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.BAD_REQUEST);
        });
        test('should respond with error response', async () => {
            const response = await request(app).post(path);
            expect(response.body[0]).toHaveProperty('error');
            expect(response.body[0]).toHaveProperty('message');
            expect(response.body[0].error).toBe(ErrorType.ERROR_USER_LOGIN);
        });
    });
    describe('when user not found', () => {
        payload = {
            email: 'testemail@gmail.com',
            password: 'testpassword123',
        };
        test('should return status code not found 404', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.NOT_FOUND);
        });
        test('should respond with error response', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.body[0]).toHaveProperty('error');
            expect(response.body[0]).toHaveProperty('message');
            expect(response.body[0].error).toBe(ErrorType.ERROR_USER_LOGIN);
            expect(response.body[0].message).toBe(
                ErrorMessage.ERROR_USER_NOT_FOUND
            );
        });
    });
    describe('when the password is not match', () => {
        beforeEach(async () => {
            const userData = {
                id: 1,
                email: 'testemail@gmail.com',
                password: await hashPassword('testpassword123'),
                phoneNumber: '0123456789',
                address: 'address',
                username: 'username',
            };
            getUserStub.callsFake((args1, args2) => {
                if (args1?.where?.email === 'testemail@gmail.com') {
                    return Promise.resolve(userData);
                } else {
                    return Promise.resolve(null);
                }
            });
        });
        payload = {
            email: 'testemail@gmail.com',
            password: 'wrongpassword123',
        };
        test('should return status code bad request 401', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.UNAUTHORIZED);
        });
        test('should respond with error response', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.body[0]).toHaveProperty('error');
            expect(response.body[0]).toHaveProperty('message');
            expect(response.body[0].error).toBe(ErrorType.ERROR_USER_LOGIN);
            expect(response.body[0].message).toBe(
                ErrorMessage.ERROR_INVALID_PASSWORD
            );
        });
    });
    describe('when database request fail', () => {
        beforeEach(async () => {
            getUserStub.throws(new Error('error database'));
        });
        const payload = {
            email: 'testemail@gmail.com',
            password: 'testpassword123',
        };
        test('should return status code internal server error 500', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.statusCode).toBe(
                RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        });
        test('should respond with error response', async () => {
            const response = await request(app).post(path).send(payload);
            expect(response.body[0]).toHaveProperty('error');
            expect(response.body[0]).toHaveProperty('message');
            expect(response.body[0].error).toBe(ErrorType.ERROR_USER_LOGIN);
        });
    });
});

describe('MEDICINE', () => {
    describe('LIST MEDICINES', () => {
        const path = '/api/v1/medicines';
        describe('when get all medicines success', () => {
            test('should return status code 200', async () => {
                const response = await request(app).get(path);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should return an array of medicines', async () => {
                const response = await request(app).get(path);
                expect(response.body.data).toHaveProperty('medicines');
                expect(Array.isArray(response.body.data.medicines)).toBe(true);
            });
        });
        describe('when get all medicines with filter', () => {
            test('should return status code 200', async () => {
                const response = await request(app).get(path);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should return an array of medicines', async () => {
                const response = await request(app)
                    .get(path)
                    .query({ categoryId: 3, isStock: 1 });
                expect(response.body.data).toHaveProperty('medicines');
                expect(Array.isArray(response.body.data.medicines)).toBe(true);
            });
        });
        describe('when database request fail', () => {
            beforeEach(async () => {
                sinon
                    .stub(db.Medicine, 'findAll')
                    .throws(new Error('error database'));
            });
            afterEach(async () => {
                sinon.restore();
            });
            test('should return status code internal server error 500', async () => {
                const response = await request(app).get(path);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
            });
            test('should respond with error response', async () => {
                const response = await request(app).get(path);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].error).toBe(
                    ErrorType.ERROR_MEDICINE_FETCH
                );
            });
        });
    });
    describe('MEDICINE ID', () => {
        const path = '/api/v1/medicines/:medicineId';
        describe('when get medicine by id success', () => {
            test('should return status code 200', async () => {
                const response = await request(app).get(
                    path.replace(':medicineId', 1)
                );
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should return an object of medicine', async () => {
                const response = await request(app).get(
                    path.replace(':medicineId', 1)
                );
                expect(response.body.data).toHaveProperty('MedicineCategory');
            });
        });
        describe('when get medicine by id not found', () => {
            test('should return status code not found 404', async () => {
                const response = await request(app).get(
                    path.replace(':medicineId', 999)
                );
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.NOT_FOUND
                );
            });
            test('should return an object of medicine', async () => {
                const response = await request(app).get(
                    path.replace(':medicineId', 999)
                );
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].error).toBe(
                    ErrorType.ERROR_MEDICINE_FETCH
                );
            });
        });
        describe('when database request fail', () => {
            beforeEach(async () => {
                sinon
                    .stub(db.Medicine, 'findOne')
                    .throws(new Error('error database'));
            });
            afterEach(async () => {
                sinon.restore();
            });
            test('should return status code internal server error 500', async () => {
                const response = await request(app).get(
                    path.replace(':medicineId', 1)
                );
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
            });
            test('should respond with error response', async () => {
                const response = await request(app).get(
                    path.replace(':medicineId', 1)
                );
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].error).toBe(
                    ErrorType.ERROR_MEDICINE_FETCH
                );
            });
        });
    });
});

describe('MEDICINE CATEGORY', () => {
    afterEach(async () => {
        sinon.restore();
    });
    describe('LIST CATEGORIES', () => {
        describe('when get all categories success', () => {
            const path = '/api/v1/categories';
            test('should return status code 200', async () => {
                const response = await request(app).get(path);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should return an array of categories', async () => {
                const response = await request(app).get(path);
                expect(Array.isArray(response.body.data)).toBe(true);
                expect(response.body.data[0]).toHaveProperty('id');
                expect(response.body.data[0]).toHaveProperty('name');
            });
        });
        describe('when database request fail', () => {
            beforeEach(async () => {
                sinon
                    .stub(db.MedicineCategory, 'findAll')
                    .throws(new Error('error database'));
            });
            test('should return status code internal server error 500', async () => {
                const response = await request(app).get('/api/v1/categories');
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
            });
            test('should respond with error response', async () => {
                const response = await request(app).get('/api/v1/categories');
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].error).toBe(
                    ErrorType.ERROR_CATEGORY_FETCH
                );
            });
        });
    });
});

describe('USER', () => {
    afterEach(async () => {
        sinon.restore();
    });
    const path = '/api/v1/profile';
    describe('when get user profile success', () => {
        beforeEach(async () => {
            sinon.stub(db.User, 'findOne').resolves({
                id: 4,
                username: 'mfaqihw',
                email: 'faqih.wijaya@bithealth.co.id',
                phoneNumber: null,
                address: 'Yogyakarta',
            });
        });
        test('should return status code 200', async () => {
            const response = await request(app)
                .get(path)
                .set('Authorization', `Bearer ${userToken}`);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
        });
        test('should return user profile object', async () => {
            const response = await request(app)
                .get(path)
                .set('Authorization', `Bearer ${userToken}`);
            expect(response.body.data).toHaveProperty('username');
            expect(response.body.data).toHaveProperty('email');
            expect(response.body.data).toHaveProperty('phoneNumber');
            expect(response.body.data).toHaveProperty('address');
        });
    });
    describe('when user with access token not found', () => {
        beforeEach(async () => {
            sinon.stub(db.User, 'findOne').resolves(null);
        });
        test('should return status code unauthorized 401', async () => {
            const response = await request(app)
                .get(path)
                .set('Authorization', `Bearer ${userToken}`);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.UNAUTHORIZED);
        });
        test('should return an error respone', async () => {
            const response = await request(app)
                .get(path)
                .set('Authorization', `Bearer ${userToken}`);
            expect(response.body[0]).toHaveProperty('error');
            expect(response.body[0]).toHaveProperty('message');
            expect(response.body[0].error).toBe(
                ErrorType.ERROR_USER_AUTHENTICATION
            );
            expect(response.body[0].message).toBe(
                ErrorMessage.ERROR_INVALID_ACCESS_TOKEN
            );
        });
    });
    describe('when access token not provided', () => {
        test('should return status code unauthorized 401', async () => {
            const response = await request(app).get(path)
                .set('Authorization', `Bearer`);
            expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.UNAUTHORIZED);
        });
        test('should return an error respone', async () => {
            const response = await request(app).get(path);
            expect(response.body[0]).toHaveProperty('error');
            expect(response.body[0]).toHaveProperty('message');
            expect(response.body[0].error).toBe(
                ErrorType.ERROR_USER_AUTHENTICATION
            );
            expect(response.body[0].message).toBe(
                ErrorMessage.ERROR_REQUIRED_ACCESS_TOKEN
            );
        });
    })
});

describe('MEDICINE ORDER', () => {
    let getMedicineStub;
    let getMedicineOrdersStub;
    let getMedicineOrderStub;
    let createMedicineOrderStub;
    let updateMedicineOrderStub;
    let deleteMedicineOrderStub;
    const loggedInUser = {
        id: 4,
        username: 'mfaqihw',
        email: 'faqih.wijaya@bithealth.co.id',
        phoneNumber: null,
        address: 'Yogyakarta',
    };
    afterEach(async () => {
        sinon.restore();
    });
    beforeEach(async () => {
        // for grant authorization
        getUserStub = sinon.stub(db.User, 'findOne').callsFake((args) => {
            if (args.where.id == loggedInUser.id) {
                return Promise.resolve(loggedInUser);
            }
        });
        getMedicineStub = sinon.stub(db.Medicine, 'findOne');
        getMedicineOrderStub = sinon.stub(db.MedicineOrder, 'findOne');
        getMedicineOrdersStub = sinon.stub(db.MedicineOrder, 'findAll');
        createMedicineOrderStub = sinon.stub(db.MedicineOrder, 'create');
        updateMedicineOrderStub = sinon.stub(db.MedicineOrder, 'update');
        deleteMedicineOrderStub = sinon.stub(db.MedicineOrder, 'destroy');
    });
    describe('CREATE MEDICINE ORDER', () => {
        const path = '/api/v1/medicine-orders';
        describe('when invalid payload', () => {
            test('should return status code 400', async () => {
                const response = await request(app)
                    .post(path)
                    .send({})
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.BAD_REQUEST);
            });
        })
        describe('when create medicine order success', () => {
            const payload = {
                medicineId: 5,
                count: 3,
            };
            const orderedMedicine = {
                id: 5,
                name: 'Paracetamol',
                price: 10000,
                stock: 10,
            };
            beforeEach(async () => {
                // to get medicine data
                getMedicineStub.resolves(orderedMedicine);
                // to check if user already have an order with certain medicine
                getMedicineOrderStub.callsFake((args) => {
                    if (
                        args.where.userId == loggedInUser.id &&
                        args.where.medicineId == payload.medicineId
                    ) {
                        return Promise.resolve(null);
                    }
                    return null;
                });
                // to create medicine order just return null bcs no return expected
                createMedicineOrderStub.resolves(null);
            });
            test('should return status code 200', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.CREATED);
            });
            test('should return an object of response', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body.data).toHaveProperty('userId');
                expect(response.body.data).toHaveProperty('medicineId');
                expect(response.body.data).toHaveProperty('count');
                expect(response.body.data).toHaveProperty('subTotal');
            });
        });
        describe('when get medicine database request fail', () => {
            const payload = {
                medicineId: 5,
                count: 3,
            };
            beforeEach(async () => {
                getMedicineStub.throws(new Error('error database'));
            });
            test('should return status code internal server error 500', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
            });
            test('should respond with error response', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
            });
        });
        describe('when medicine not found', () => {
            const payload = {
                medicineId: 5,
                count: 3,
            };
            beforeEach(async () => {
                getMedicineStub.resolves(null);
            });
            test('should return status code not found 404', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.NOT_FOUND
                );
            });
            test('should respond with error response', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
            });
        });
        describe('when medicine already exist in cart', () => {
            const medicine = medicines[0];
            medicine.id = 1;
            const existMedicineOrder = {
                userId: loggedInUser.id,
                medicineId: medicine.id,
                orderId: null,
                count: 3,
                subTotal: medicine.price * 3,
            };
            const payload = {
                medicineId: medicine.id,
                count: 1,
            };
            beforeEach(async () => {
                getMedicineStub.resolves(medicine);
                getMedicineOrderStub.callsFake((args) => {
                    if (args.where.medicineId == medicine.id) {
                        return Promise.resolve(existMedicineOrder);
                    }
                });
            });
            test('should return status code conflict 409', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.CONFLICT);
            });
            test('should respond with error response', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_MEDICINE_ORDER_ALREADY_EXIST
                );
            });
        });
        describe('when medicine stock is not enough', () => {
            const medicine = medicines[0];
            medicine.id = 1;
            const payload = {
                medicineId: medicine.id,
                count: 100,
            };
            beforeEach(async () => {
                // check medicine availability
                getMedicineStub.resolves(medicine);
                // check medicine order in cart
                getMedicineOrderStub.resolves(null);
            });
            test('should return status code bad request 400', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.BAD_REQUEST
                );
            });
            test('should respond with error response', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_MEDICINE_NOT_ENOUGH
                );
            });
        });
    });
    describe('GET LIST MEDICINE ORDER', () => {
        const path = '/api/v1/medicine-orders';
        describe('when get all medicine order success', () => {
            beforeEach(async () => {
                getMedicineOrdersStub.resolves([
                    {
                        id: 18,
                        userId: 4,
                        medicineId: 5,
                        orderId: null,
                        count: 7,
                        subTotal: 126000,
                        createdAt: '2024-05-31T01:44:02.299Z',
                        Medicine: {
                            id: 5,
                            name: 'Amoxicillin',
                            description:
                                'Amoxicillin adalah antibiotik golongan penisilin yang digunakan untuk mengobati berbagai jenis infeksi bakteri, termasuk infeksi saluran pernapasan, telinga, dan infeksi kulit.',
                            price: 18000,
                            image: 'https://media.istockphoto.com/id/1295333389/photo/amoxicillin.webp?s=612x612&w=is&k=20&c=AfyC_jSSuYHJuhxHkftdhhlF3wUbqR18_dQNMI5kvhI=',
                        },
                    },
                ]);
            });
            test('should return status code 200', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should return an array of medicine order', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body.data).toBeInstanceOf(Array);
            });
        });
    });
    describe('GET MEDICINE ORDER BY ID', () => {
        const path = '/api/v1/medicine-orders/:medicineOrderId';
        const medicineOrder = {
            id: 18,
            userId: loggedInUser.id,
            medicineId: 5,
            orderId: null,
            count: 7,
            subTotal: 126000,
            createdAt: '2024-05-31T01:44:02.299Z',
        };
        describe('when get medicine order success', () => {
            beforeEach(async () => {
                getMedicineOrderStub.resolves(medicineOrder);
            });
            test('should return status code 200', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should return an object of medicine order', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body.data).toHaveProperty('userId');
                expect(response.body.data).toHaveProperty('medicineId');
                expect(response.body.data).toHaveProperty('orderId');
                expect(response.body.data).toHaveProperty('count');
                expect(response.body.data).toHaveProperty('subTotal');
            });
        });
        describe('when medicine order not found', () => {
            beforeEach(async () => {
                getMedicineOrderStub.resolves(null);
            });
            test('should return status code 404', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.NOT_FOUND
                );
            });
            test('should return an error response', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_MEDICINE_ORDER_NOT_FOUND
                );
            });
        });
        describe('when userid does not match', () => {
            const notMatchedMedicineOrder = {
                ...medicineOrder,
                userId: 5,
            };
            beforeEach(async () => {
                getMedicineOrderStub.resolves(notMatchedMedicineOrder);
            });
            test('should return status code 403', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.FORBIDDEN
                );
            });
            test('should return an error response', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_RESTRICTED_ACCESS
                );
            });
        });
    });
    describe('CHECK MEDICINE IN CART', () => {
        const path = '/api/v1/medicine-orders/medicines/:medicineId/check';
        const medicineId = 5;
        describe('when medicine is not in cart', () => {
            const medicineOrder = {
                medicineId,
            };
            beforeEach(async () => {
                getMedicineOrderStub.resolves(null);
            });
            test('should return status code 200', async () => {
                const response = await request(app)
                    .get(path.replace(':medicineId', medicineId))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should return a boolean', async () => {
                const response = await request(app)
                    .get(path.replace(':medicineId', medicineId))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body.data).toBe(false);
            });
        });
        describe('when medicine already in cart', () => {
            const notMatchedMedicineOrder = {
                medicineId: medicineId + 3,
            };
            beforeEach(async () => {
                getMedicineOrderStub.resolves(notMatchedMedicineOrder);
            });
            test('should return status code 200', async () => {
                const response = await request(app)
                    .get(path.replace(':medicineId', medicineId))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should return a boolean', async () => {
                const response = await request(app)
                    .get(path.replace(':medicineId', medicineId))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body.data).toBe(true);
            });
        });
    });
    describe('UPDATE MEDICINE ORDER QUANTITY', () => {
        const path = '/api/v1/medicine-orders/:medicineOrderId';
        const medicineInCart = { id: 1, ...medicines[0] };
        const updateMedicineOrder = {
            id: 1,
            userId: loggedInUser.id,
            medicineId: medicineInCart.id,
            orderId: null,
            count: medicineInCart.stock - 1,
            subTotal: medicineInCart.price * 2,
        };
        describe('when invalid payload', () => {
            const payload = {
                quantity: -1,
            };
            test('should return status code 400', async () => {
                const response = await request(app)
                    .put(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.BAD_REQUEST
                );
            });
        })
        describe('when update quantity success', () => {
            const payload = {
                quantity: medicineInCart.stock,
            };
            beforeEach(async () => {
                getMedicineOrderStub.callsFake((args) => {
                    if (args.where.id == updateMedicineOrder.id) {
                        return Promise.resolve(updateMedicineOrder);
                    }
                });
                getMedicineStub.callsFake((args) => {
                    if (args.where.id == updateMedicineOrder.medicineId) {
                        return Promise.resolve(medicineInCart);
                    }
                });
                updateMedicineOrderStub.callsFake((args1, args2) => {
                    if (args2.where.id == updateMedicineOrder.id) {
                        return Promise.resolve([1]);
                    }
                });
            });
            test('should return status code 200', async () => {
                const response = await request(app)
                    .put(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should respond with updated medicine order', async () => {
                const response = await request(app)
                    .put(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body.data).toHaveProperty('id');
                expect(response.body.data).toHaveProperty('medicineId');
                expect(response.body.data).toHaveProperty('count');
                expect(response.body.data).toHaveProperty('subTotal');
            });
        });
        describe('when medicine order not found', () => {
            const payload = {
                quantity: medicineInCart.stock,
            };
            beforeEach(async () => {
                getMedicineOrderStub.callsFake((args) => {
                    if (args.where.id == updateMedicineOrder.id) {
                        return Promise.resolve(null);
                    }
                });
            });
            test('should return status code not found 404', async () => {
                const response = await request(app)
                    .put(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.NOT_FOUND
                );
            });
            test('should respond with error response', async () => {
                const response = await request(app)
                    .put(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_MEDICINE_ORDER_NOT_FOUND
                );
            });
        });
        describe('when user doesnt have an access to edit medicine order', () => {
            const payload = {
                quantity: medicineInCart.stock,
            };
            const updateMedicineOrderWrongUser = {
                ...updateMedicineOrder,
                userId: 2,
            };
            beforeEach(async () => {
                getMedicineOrderStub.callsFake((args) => {
                    if (args.where.id == updateMedicineOrder.id) {
                        return Promise.resolve(updateMedicineOrderWrongUser);
                    }
                });
            });
            test('should return status code forbidden 403', async () => {
                const response = await request(app)
                    .put(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.FORBIDDEN
                );
            });
            test('should respond with error response', async () => {
                const response = await request(app)
                    .put(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_RESTRICTED_ACCESS
                );
            });
        });
        describe('when medicine missing', () => {
            const payload = {
                quantity: medicineInCart.stock,
            };
            beforeEach(async () => {
                getMedicineOrderStub.callsFake((args) => {
                    if (args.where.id == updateMedicineOrder.id) {
                        return Promise.resolve(updateMedicineOrder);
                    }
                });
                getMedicineStub.callsFake((args) => {
                    if (args.where.id == updateMedicineOrder.medicineId) {
                        return Promise.resolve(null);
                    }
                });
            });
            test('should return status code not found 404', async () => {
                const response = await request(app)
                    .put(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.NOT_FOUND
                );
            });
            test('should respond with error response', async () => {
                const response = await request(app)
                    .put(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_MEDICINE_NOT_FOUND
                );
            });
        });
        describe('when medicine stock is not enough', () => {
            const payload = {
                quantity: medicineInCart.stock + 1,
            };
            beforeEach(async () => {
                getMedicineOrderStub.callsFake((args) => {
                    if (args.where.id == updateMedicineOrder.id) {
                        return Promise.resolve(updateMedicineOrder);
                    }
                });
                getMedicineStub.callsFake((args) => {
                    if (args.where.id == updateMedicineOrder.medicineId) {
                        return Promise.resolve(medicineInCart);
                    }
                });
            });
            test('should return status code bad request 400', async () => {
                const response = await request(app)
                    .put(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.BAD_REQUEST
                );
            });
            test('should respond with error response', async () => {
                const response = await request(app)
                    .put(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_MEDICINE_NOT_ENOUGH
                );
            });
        });
        describe('when database fail to update medicine order quantity', () => {
            const payload = {
                quantity: medicineInCart.stock,
            };
            beforeEach(async () => {
                getMedicineOrderStub.callsFake((args) => {
                    if (args.where.id == updateMedicineOrder.id) {
                        return Promise.resolve(updateMedicineOrder);
                    }
                });
                getMedicineStub.callsFake((args) => {
                    if (args.where.id == updateMedicineOrder.medicineId) {
                        return Promise.resolve(medicineInCart);
                    }
                });
                updateMedicineOrderStub.throws(new Error('error database'));
            });
            test('should return status code internal server error 500', async () => {
                const response = await request(app)
                    .put(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
            });
        });
    });
    describe('CANCEL MEDICINE ORDER', () => {
        const path = '/api/v1/medicine-orders/:medicineOrderId';
        const medicineInCart = { id: 1, ...medicines[0] };
        const updateMedicineOrder = {
            id: 1,
            userId: loggedInUser.id,
            medicineId: medicineInCart.id,
            orderId: null,
            count: medicineInCart.stock - 1,
            subTotal: medicineInCart.price * 2,
        };
        describe('when cancel medicine order success', () => {
            beforeEach(async () => {
                getMedicineOrderStub.resolves(updateMedicineOrder);
                deleteMedicineOrderStub.resolves(1);
            });
            test('should return status code 200', async () => {
                const response = await request(app)
                    .delete(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should return affected rows', async () => {
                const response = await request(app)
                    .delete(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body.data).toHaveProperty('affectedRows');
            });
        });
        describe('when medicine order is already cancelled or checkouted', () => {
            const cancelledMedicineOrder = {
                ...updateMedicineOrder,
                deletedAt: new Date(),
            };
            beforeEach(async () => {
                getMedicineOrderStub.resolves(cancelledMedicineOrder);
            });
            test('should return status code not found 404', async () => {
                const response = await request(app)
                    .delete(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.NOT_FOUND
                );
            });
            test('should return an error response', async () => {
                const response = await request(app)
                    .delete(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
            });
        });
        describe('when userId of the medicine order not match the logged in user', () => {
            const notMatchedMedicineOrder = {
                ...updateMedicineOrder,
                userId: loggedInUser.id + 1,
            };
            beforeEach(async () => {
                getMedicineOrderStub.resolves(notMatchedMedicineOrder);
            });
            test('should return status code restricted access 403', async () => {
                const response = await request(app)
                    .delete(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.FORBIDDEN
                );
            });
            test('should return an error response', async () => {
                const response = await request(app)
                    .delete(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_RESTRICTED_ACCESS
                );
            });
        });
        describe('when database fail to cancel medicine order', () => {
            beforeEach(async () => {
                getMedicineOrderStub.resolves(updateMedicineOrder);
                deleteMedicineOrderStub.throws(new Error('error database'));
            });
            test('should return status code internal server error 500', async () => {
                const response = await request(app)
                    .delete(
                        path.replace(':medicineOrderId', updateMedicineOrder.id)
                    )
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
            });
        });
    });
});

describe('ORDER', () => {
    let getUserStub;
    let getMedicineOrdersStub;
    let getOrdersStub;
    let getOrderStub;
    let createOrderStub;
    let updateOrderStub;
    let updateMedicineOrder;
    let updateMedicine;
    const loggedInUser = {
        id: 4,
        username: 'mfaqihw',
        email: 'faqih.wijaya@bithealth.co.id',
        phoneNumber: null,
        address: 'Yogyakarta',
    };
    afterEach(async () => {
        sinon.restore();
    });
    beforeEach(async () => {
        // for grant authorization
        getUserStub = sinon.stub(db.User, 'findOne').callsFake((args) => {
            if (args.where.id == loggedInUser.id) {
                return Promise.resolve(loggedInUser);
            }
        });
        getMedicineStub = sinon.stub(db.Medicine, 'findOne');
        getOrderStub = sinon.stub(db.Order, 'findOne');
        getOrdersStub = sinon.stub(db.Order, 'findAll');
        createOrderStub = sinon.stub(db.Order, 'create');
        updateOrderStub = sinon.stub(db.Order, 'update');
        getMedicineOrdersStub = sinon.stub(db.MedicineOrder, 'findAll');
        updateMedicine = sinon.stub(db.Medicine, 'update');
        updateMedicineOrder = sinon.stub(db.MedicineOrder, 'update');
    });
    describe('CHECKOUT', () => {
        const path = '/api/v1/orders';
        describe('when success checking out', () => {
            const payload = {
                medicineOrderIds: [1, 2],
            };
            const medicine1 = { id: 1, ...medicines[0] };
            const medicine2 = { id: 2, ...medicines[1] };
            const medicineOrders = [
                {
                    userId: loggedInUser.id,
                    medicineId: medicine1.id,
                    orderId: null,
                    count: 1,
                    subTotal: medicine1.price,
                    createdAt: new Date(),
                },
                {
                    userId: loggedInUser.id,
                    medicineId: medicine2.id,
                    orderId: null,
                    count: 2,
                    subTotal: medicine2.price * 2,
                    createdAt: new Date(),
                },
            ];
            const createdOrder = {
                userId: loggedInUser.id,
                total: medicineOrders.reduce(
                    (acc, cur) => acc + cur.subTotal,
                    0
                ),
                status: 0,
                address: loggedInUser.address,
                paidAt: null,
            };
            beforeEach(async () => {
                getMedicineOrdersStub.callsFake((args1, args2) => {
                    if (
                        args1.where.id[db.Sequelize.Op.in].toString() ==
                        payload.medicineOrderIds.toString()
                    ) {
                        return Promise.resolve(medicineOrders);
                    }
                });
                createOrderStub.callsFake((args1, args2) => {
                    if (args1.userId == loggedInUser.id) {
                        return Promise.resolve(createdOrder);
                    }
                });
                getMedicineStub.callsFake((args1, args2) => {
                    return Promise.resolve(
                        args1.where.id == medicine1.id ? medicine1 : medicine2
                    );
                });
                updateMedicineOrder.resolves([0]);
                updateMedicine.resolves(null);
            });
            test('should return status code created 201', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.CREATED);
            });
            test('should return created order', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body.data).toHaveProperty('userId');
                expect(response.body.data).toHaveProperty('total');
                expect(response.body.data).toHaveProperty('status');
                expect(response.body.data).toHaveProperty('address');
                expect(response.body.data).toHaveProperty('paidAt');
            });
        });
        describe('when request body is not valid', () => {
            const notValidPayload = {
                medicineOrderIds: 1,
            };
            test('should return status code bad request 400', async () => {
                const response = await request(app)
                    .post(path)
                    .send(notValidPayload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.BAD_REQUEST
                );
            });
            test('should return error response', async () => {
                const response = await request(app)
                    .post(path)
                    .send(notValidPayload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].error).toBe(
                    ErrorType.ERROR_ORDER_CHECKOUT
                );
            });
        });
        describe('when there are medicine orders that cant be checked out', () => {
            const payload = {
                medicineOrderIds: [1, 2],
            };
            beforeEach(async () => {
                getMedicineOrdersStub.callsFake((args1, args2) => {
                    if (
                        args1.where.id[db.Sequelize.Op.in].toString() ==
                        payload.medicineOrderIds.toString()
                    ) {
                        return Promise.resolve([]);
                    }
                });
            });
            test('should return not found 404', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.NOT_FOUND
                );
            });
            test('should return error response', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].error).toBe(
                    ErrorType.ERROR_ORDER_CHECKOUT
                );
            });
        });
        describe('when medicine order userdId isnt match the logged in user', () => {
            const payload = {
                medicineOrderIds: [1, 2],
            };
            const medicine1 = { id: 1, ...medicines[0] };
            const medicine2 = { id: 2, ...medicines[1] };
            const medicineOrders = [
                {
                    userId: loggedInUser.id + 1,
                    medicineId: medicine1.id,
                    orderId: null,
                    count: 1,
                    subTotal: medicine1.price,
                    createdAt: new Date(),
                },
                {
                    userId: loggedInUser.id + 2,
                    medicineId: medicine2.id,
                    orderId: null,
                    count: 2,
                    subTotal: medicine2.price * 2,
                    createdAt: new Date(),
                },
            ];
            const createdOrder = {
                userId: loggedInUser.id,
                total: medicineOrders.reduce(
                    (acc, cur) => acc + cur.subTotal,
                    0
                ),
                status: 0,
                address: loggedInUser.address,
                paidAt: null,
            };
            beforeEach(async () => {
                getMedicineOrdersStub.callsFake((args1, args2) => {
                    if (
                        args1.where.id[db.Sequelize.Op.in].toString() ==
                        payload.medicineOrderIds.toString()
                    ) {
                        return Promise.resolve(medicineOrders);
                    }
                });
                createOrderStub.callsFake((args1, args2) => {
                    if (args1.userId == loggedInUser.id) {
                        return Promise.resolve(createdOrder);
                    }
                });
            });
            test('should return forbidden 403', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.FORBIDDEN
                );
            });
            test('should return error response', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].error).toBe(
                    ErrorType.ERROR_ORDER_CHECKOUT
                );
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_RESTRICTED_ACCESS
                );
            });
        });
        describe('when the medicine isnt available', () => {
            const payload = {
                medicineOrderIds: [1, 2],
            };
            const medicine1 = { id: 1, ...medicines[0] };
            const medicine2 = { id: 2, ...medicines[1] };
            const medicineOrders = [
                {
                    userId: loggedInUser.id,
                    medicineId: medicine1.id,
                    orderId: null,
                    count: 1,
                    subTotal: medicine1.price,
                    createdAt: new Date(),
                },
                {
                    userId: loggedInUser.id,
                    medicineId: medicine2.id,
                    orderId: null,
                    count: 2,
                    subTotal: medicine2.price * 2,
                    createdAt: new Date(),
                },
            ];
            const createdOrder = {
                userId: loggedInUser.id,
                total: medicineOrders.reduce(
                    (acc, cur) => acc + cur.subTotal,
                    0
                ),
                status: 0,
                address: loggedInUser.address,
                paidAt: null,
            };
            beforeEach(async () => {
                getMedicineOrdersStub.callsFake((args1, args2) => {
                    if (
                        args1.where.id[db.Sequelize.Op.in].toString() ==
                        payload.medicineOrderIds.toString()
                    ) {
                        return Promise.resolve(medicineOrders);
                    }
                });
                createOrderStub.callsFake((args1, args2) => {
                    if (args1.userId == loggedInUser.id) {
                        return Promise.resolve(createdOrder);
                    }
                });
                getMedicineStub.callsFake((args1, args2) => {
                    if (
                        args1.where.id == medicine1.id ||
                        args1.where.id == medicine2.id
                    ) {
                        return Promise.resolve(null);
                    }
                });
            });
            test('should return not found 404', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.NOT_FOUND
                );
            });
            test('should return error response', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].error).toBe(
                    ErrorType.ERROR_ORDER_CHECKOUT
                );
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_MEDICINE_NOT_FOUND
                );
            });
        });
        describe('when the medicine stock is not enough anymore', () => {
            const payload = {
                medicineOrderIds: [1, 2],
            };
            const medicine1 = { id: 1, ...medicines[0], stock: 0 };
            const medicine2 = { id: 2, ...medicines[1], stock: 0 };
            const medicineOrders = [
                {
                    userId: loggedInUser.id,
                    medicineId: medicine1.id,
                    orderId: null,
                    count: 1,
                    subTotal: medicine1.price,
                    createdAt: new Date(),
                },
                {
                    userId: loggedInUser.id,
                    medicineId: medicine2.id,
                    orderId: null,
                    count: 2,
                    subTotal: medicine2.price * 2,
                    createdAt: new Date(),
                },
            ];
            const createdOrder = {
                userId: loggedInUser.id,
                total: medicineOrders.reduce(
                    (acc, cur) => acc + cur.subTotal,
                    0
                ),
                status: 0,
                address: loggedInUser.address,
                paidAt: null,
            };
            beforeEach(async () => {
                getMedicineOrdersStub.callsFake((args1, args2) => {
                    if (
                        args1.where.id[db.Sequelize.Op.in].toString() ==
                        payload.medicineOrderIds.toString()
                    ) {
                        return Promise.resolve(medicineOrders);
                    }
                });
                createOrderStub.callsFake((args1, args2) => {
                    if (args1.userId == loggedInUser.id) {
                        return Promise.resolve(createdOrder);
                    }
                });
                getMedicineStub.callsFake((args1, args2) => {
                    return Promise.resolve(
                        args1.where.id == medicine1.id ? medicine1 : medicine2
                    );
                });
            });
            test('should return bad request 400', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.BAD_REQUEST
                );
            });
            test('should return error response', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].error).toBe(
                    ErrorType.ERROR_ORDER_CHECKOUT
                );
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_MEDICINE_NOT_ENOUGH
                );
            });
        });
        describe('when create order database fail', () => {
            const payload = {
                medicineOrderIds: [1, 2],
            };
            const medicine1 = { id: 1, ...medicines[0] };
            const medicine2 = { id: 2, ...medicines[1] };
            const medicineOrders = [
                {
                    userId: loggedInUser.id + 1,
                    medicineId: medicine1.id,
                    orderId: null,
                    count: 1,
                    subTotal: medicine1.price,
                    createdAt: new Date(),
                },
                {
                    userId: loggedInUser.id + 2,
                    medicineId: medicine2.id,
                    orderId: null,
                    count: 2,
                    subTotal: medicine2.price * 2,
                    createdAt: new Date(),
                },
            ];
            const createdOrder = {
                userId: loggedInUser.id,
                total: medicineOrders.reduce(
                    (acc, cur) => acc + cur.subTotal,
                    0
                ),
                status: 0,
                address: loggedInUser.address,
                paidAt: null,
            };
            beforeEach(async () => {
                getMedicineOrdersStub.callsFake((args1, args2) => {
                    if (
                        args1.where.id[db.Sequelize.Op.in].toString() ==
                        payload.medicineOrderIds.toString()
                    ) {
                        return Promise.resolve(medicineOrders);
                    }
                });
                createOrderStub.throws(new Error('create order database fail'));
            });
            test('should return internal server error 500', async () => {
                const response = await request(app)
                    .post(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
            });
        });
    });
    describe('GET MY ORDERS', () => {
        const path = '/api/v1/orders';
        const orders = [
            {
                userId: loggedInUser.id,
                total: 100000,
                status: 0,
                address: loggedInUser.address,
                paidAt: null,
            },
            {
                userId: loggedInUser.id,
                total: 200000,
                status: 0,
                address: loggedInUser.address,
                paidAt: null,
            },
        ];
        beforeEach(async () => {
            getOrdersStub.callsFake((args) => {
                if (args.where.userId == loggedInUser.id) {
                    return Promise.resolve(orders);
                }
            });
        });
        describe('when get my orders success', () => {
            test('should return status code 200', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should return an array of orders', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body.data).toBeInstanceOf(Array);
            });
        });
        describe('when get my orders database fail', () => {
            beforeEach(async () => {
                getOrdersStub.throws(new Error('get my orders database fail'));
            });
            test('should return internal server error 500', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
            });
        });
    });
    describe('GET ORDER BY ID', () => {
        const path = '/api/v1/orders/:orderId';
        const order = {
            userId: loggedInUser.id,
            total: 100000,
            status: 0,
            address: loggedInUser.address,
            paidAt: null,
        };
        describe('when get order success', () => {
            beforeEach(async () => {
                getOrderStub.resolves(order);
            });
            test('should return status code 200', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should return an object of order', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body.data).toHaveProperty('userId');
                expect(response.body.data).toHaveProperty('total');
                expect(response.body.data).toHaveProperty('status');
                expect(response.body.data).toHaveProperty('address');
                expect(response.body.data).toHaveProperty('paidAt');
            });
        });
        describe('when get order database fail', () => {
            beforeEach(async () => {
                getOrderStub.throws(new Error('get order database fail'));
            });
            test('should return internal server error 500', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
            });
        });
        describe('when get order not found', () => {
            beforeEach(async () => {
                getOrderStub.resolves(null);
            });
            test('should return not found 404', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.NOT_FOUND
                );
            });
        });
        describe('when user doesnt have access', () => {
            beforeEach(async () => {
                getOrderStub.resolves({
                    ...order,
                    userId: loggedInUser.id + 1,
                });
            });
            test('should return forbidden 403', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.FORBIDDEN
                );
            });
            test('should return an error response', async () => {
                const response = await request(app)
                    .get(path)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_RESTRICTED_ACCESS
                );
            });
        });
    });
    describe('UPDATE ORDER ADDRESS', () => {
        const path = '/api/v1/orders/:orderId';
        const order = {
            userId: loggedInUser.id,
            total: 100000,
            status: 0,
            address: loggedInUser.address,
            paidAt: null,
        };
        describe('when update order address success', () => {
            const payload = {
                address: loggedInUser.address + ' updated',
            };
            beforeEach(async () => {
                getOrderStub.resolves(order);
                updateOrderStub.resolves([1]);
            });
            test('should return status code 200', async () => {
                const response = await request(app)
                    .put(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should return an object of order', async () => {
                const response = await request(app)
                    .put(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body.data).toHaveProperty('affectedRows');
            });
        });
        describe('when update payload is invalid', () => {
            const payload = {
                address: 23,
            };
            test('should return status code bad request 400', async () => {
                const response = await request(app)
                    .put(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.BAD_REQUEST
                );
            });
        })
        describe('when order not found', () => {
            const payload = {
                address: loggedInUser.address + ' updated',
            };
            beforeEach(async () => {
                getOrderStub.resolves(null);
            });
            test('should return status code not found 404', async () => {
                const response = await request(app)
                    .put(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.NOT_FOUND
                );
            });
            test('should return an error response', async () => {
                const response = await request(app)
                    .put(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
            });
        });
        describe('when order is paid or cancelled', () => {
            const payload = {
                address: loggedInUser.address + ' updated',
            };
            beforeEach(async () => {
                getOrderStub.resolves({
                    ...order,
                    status: 1,
                });
            });
            test('should return status code bad request 400', async () => {
                const response = await request(app)
                    .put(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.BAD_REQUEST
                );
            });
            test('should return an error response', async () => {
                const response = await request(app)
                    .put(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_ORDER_NOT_WAITING
                );
            });
        });
        describe('when user doesnt have access', () => {
            const payload = {
                address: loggedInUser.address + ' updated',
            };
            beforeEach(async () => {
                getOrderStub.resolves({
                    ...order,
                    userId: loggedInUser.id + 1,
                });
            });
            test('should return forbidden 403', async () => {
                const response = await request(app)
                    .put(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.FORBIDDEN
                );
            });
            test('should return an error response', async () => {
                const response = await request(app)
                    .put(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_RESTRICTED_ACCESS
                );
            });
        });
        describe('when update order address database fail', () => {
            const payload = {
                address: loggedInUser.address + ' updated',
            };
            beforeEach(async () => {
                getOrderStub.resolves(order);
                updateOrderStub.throws(new Error('update order database fail'));
            });
            test('should return internal server error 500', async () => {
                const response = await request(app)
                    .put(path)
                    .send(payload)
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
            });
        });
    });
    describe('CANCEL ORDER', () => {
        const path = '/api/v1/orders/:orderId/cancel';
        const order = {
            id: 6,
            userId: loggedInUser.id,
            total: 100000,
            status: 0,
            address: loggedInUser.address,
            paidAt: null,
        };
        const medicine1 = { id: 1, ...medicines[0] };
        const medicine2 = { id: 2, ...medicines[1] };
        const medicineOrders = [
            {
                userId: loggedInUser.id,
                medicineId: medicine1.id,
                orderId: order.id,
                count: 1,
                subTotal: medicine1.price,
                createdAt: new Date(),
            },
            {
                userId: loggedInUser.id,
                medicineId: medicine2.id,
                orderId: order.id,
                count: 2,
                subTotal: medicine2.price * 2,
                createdAt: new Date(),
            },
        ];
        order.total = medicineOrders.reduce(
            (acc, cur) => acc + cur.subTotal,
            0
        );
        describe('when cancel order success', () => {
            beforeEach(async () => {
                getOrderStub.callsFake((args) => {
                    if (args.where.id == order.id) {
                        return Promise.resolve(order);
                    }
                });
                getMedicineOrdersStub.callsFake((args) => {
                    if (args.where.orderId == order.id) {
                        return Promise.resolve(medicineOrders);
                    }
                });
                getMedicineStub.callsFake((args) => {
                    if (args.where.id == medicine1.id) {
                        return Promise.resolve(medicine1);
                    }
                    if (args.where.id == medicine2.id) {
                        return Promise.resolve(medicine2);
                    }
                });
                updateOrderStub.callsFake((args1, args2) => {
                    return Promise.resolve([1]);
                });
                updateMedicine.callsFake((args1, args2) => {
                    return Promise.resolve(null);
                });
            });
            test('should return status code ok 200', async () => {
                const response = await request(app)
                    .put(path.replace(':orderId', order.id))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(RESPONSE_STATUS_CODE.OK);
            });
            test('should return a cancel order success response', async () => {
                const response = await request(app)
                    .put(path.replace(':orderId', order.id))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body.data).toHaveProperty('id');
                expect(response.body.data).toHaveProperty('status');
            });
        });
        describe('when order not found', () => {
            beforeEach(async () => {
                getOrderStub.callsFake((args) => {
                    if (args.where.id == order.id) {
                        return Promise.resolve(null);
                    }
                });
            });
            test('should return not found 404', async () => {
                const response = await request(app)
                    .put(path.replace(':orderId', order.id))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.NOT_FOUND
                );
            });
            test('should return an error response', async () => {
                const response = await request(app)
                    .put(path.replace(':orderId', order.id))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_ORDER_NOT_FOUND
                );
            });
        });
        describe('when order is paid or cancelled', () => {
            beforeEach(async () => {
                getOrderStub.callsFake((args) => {
                    if (args.where.id == order.id) {
                        return Promise.resolve({
                            ...order,
                            status: 1,
                        });
                    }
                });
            });
            test('should return bad request 400', async () => {
                const response = await request(app)
                    .put(path.replace(':orderId', order.id))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.BAD_REQUEST
                );
            });
            test('should return an error response', async () => {
                const response = await request(app)
                    .put(path.replace(':orderId', order.id))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_ORDER_NOT_WAITING
                );
            });
        });
        describe('when user doesnt have access', () => {
            beforeEach(async () => {
                getOrderStub.callsFake((args) => {
                    if (args.where.id == order.id) {
                        return Promise.resolve({
                            ...order,
                            userId: loggedInUser.id + 1,
                        });
                    }
                });
            });
            test('should return forbidden 403', async () => {
                const response = await request(app)
                    .put(path.replace(':orderId', order.id))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.FORBIDDEN
                );
            });
            test('should return an error response', async () => {
                const response = await request(app)
                    .put(path.replace(':orderId', order.id))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_RESTRICTED_ACCESS
                );
            });
        });
        describe('when one or more medicine is not found', () => {
            beforeEach(async () => {
                getOrderStub.callsFake((args) => {
                    if (args.where.id == order.id) {
                        return Promise.resolve(order);
                    }
                });
                getMedicineOrdersStub.callsFake((args) => {
                    if (args.where.orderId == order.id) {
                        return Promise.resolve(medicineOrders);
                    }
                });
                getMedicineStub.callsFake((args) => {
                    if (args.where.id == medicine1.id) {
                        return Promise.resolve(null);
                    }
                    if (args.where.id == medicine2.id) {
                        return Promise.resolve(null);
                    }
                });
            });
            test('should return not found 404', async () => {
                const response = await request(app)
                    .put(path.replace(':orderId', order.id))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.statusCode).toBe(
                    RESPONSE_STATUS_CODE.NOT_FOUND
                );
            });
            test('should return an error response', async () => {
                const response = await request(app)
                    .put(path.replace(':orderId', order.id))
                    .set('Authorization', `Bearer ${userToken}`);
                expect(response.body[0]).toHaveProperty('error');
                expect(response.body[0]).toHaveProperty('message');
                expect(response.body[0].message).toBe(
                    ErrorMessage.ERROR_MEDICINE_NOT_FOUND
                );
            });
        });
    });
});
