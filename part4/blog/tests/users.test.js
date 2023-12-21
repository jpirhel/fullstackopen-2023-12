const User = require("../models/user");
const supertest = require("supertest");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const app = require("../app");

const api = supertest(app);

const rootUserData = async () => {
    const saltRounds = 10;
    const password = "password123";
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // noinspection UnnecessaryLocalVariableJS
    const data = {
        username: "root",
        name: "Root User",
        password: passwordHash,
    };

    return data;
}

const getUsers = async () => {
    const result = await api
        .get("/api/users")
        .expect(200)
        .expect('Content-Type', /application\/json/)

    // noinspection UnnecessaryLocalVariableJS
    const users = result.body;

    return users;
}

beforeEach(async () => {
    // delete existing users
    await User.deleteMany({});

    // create test user

    const rootUser = new User(await rootUserData())
    await rootUser.save();
});

describe('when the database contains a single user', () => {
    test('the number of users should be one', async () => {
        const users = await getUsers();

        expect(users).toHaveLength(1);
    });

    test('usernames should be unique', async () => {
        const data = await rootUserData();

        // noinspection JSUnusedLocalSymbols
        const result = await api
            .post("/api/users")
            .send(data)
            .expect(400);

        const users = await getUsers();

        expect(users).toHaveLength(1);
    });

    test('adding an user with a different username should work', async () => {
        const saltRounds = 10;
        const password = "password123";
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const data = {
            username: "root2",
            name: "Root User 2",
            password: passwordHash,
        }

        // noinspection JSUnusedLocalSymbols
        const result = await api
            .post("/api/users")
            .send(data)
            .expect(200);

        const users = await getUsers();

        expect(users).toHaveLength(2);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
