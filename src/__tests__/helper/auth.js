const validLoginPayloads = [
    {
        email: 'username1@example.com',
        password: 'username1pass123',
    },
    {
        email: 'username2@example.com',
        password: 'username2pass123',
    },
    {
        email: 'username3@example.com',
        password: 'username3pass123',
    }
]

const invalidLoginPayloads = [
    {
        email: 'username1@example.com',
    },
    {
        email: 'username2@example',
        password: 'username2pass1234',
    },
    {
        email: 'username3@example.com',
        password: '123',
    }
]

const validRegisterPayloads = [
    {
        username: 'username1',
        email: 'username1@example.com',
        password: 'username1pass123',
        phoneNumber: '0123456789',
        address: 'address1',
    },
    {
        username: 'username2',
        email: 'username2@example.com',
        password: 'username2pass123',
        phoneNumber: '0123456789',
        address: 'address2',
    },
    {
        username: 'username3',
        email: 'username3@example.com',
        password: 'username3pass123',
        phoneNumber: '0123456789',
        address: 'address3',
    }
]

const invalidRegisterPayloads = [
    {
        username: '1username1',
        email: 'username1@example.com',
        password: 'username1pass123',
        phoneNumber: '0123456789',
        address: 'address1',
    },
    {
        username: 'username2',
        email: 'username2@example',
        password: 'username2pass123',
        phoneNumber: '0123456789',
        address: 'address2',
    },
    {
        username: 'username3',
        email: 'username3@example.com',
        password: '123',
        phoneNumber: '0123456789',
        address: 'address3',
    }
]

const testUsers = [
    {
        id: 1,
        username: 'username1',
        email: 'username1@example.com',
        password: 'username1pass123',
        phoneNumber: '0123456789',
        address: 'address1',
    },
    {
        id: 2,
        username: 'username2',
        email: 'username2@example.com',
        password: 'username2pass123',
        phoneNumber: '0123456789',
        address: 'address2',
    },
    {
        id: 3,
        username: 'username3',
        email: 'username3@example.com',
        password: 'username3pass123',
        phoneNumber: '0123456789',
        address: 'address3',
    }
]

module.exports = { 
    validLoginPayloads,
    invalidLoginPayloads,
    validRegisterPayloads,
    invalidRegisterPayloads,
    testUsers
 }