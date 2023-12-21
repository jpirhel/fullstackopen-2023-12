const _ = require("lodash");

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

describe('login tests', () => {
    test('login succeeds with correct password', async () => {
        const correctUserName = "root";
        const correctPassword = "password123";

        const result = await api
            .post("/api/login")
            .send({username: correctUserName, password: correctPassword})
            .expect(200);

        const name = _.get(result, "body.name");

        expect(name).toBe("Root User");
    });

    test('login fails with incorrect password', async () => {
        const correctUserName = "root";
        const correctPassword = "password124";

        const result = await api
            .post("/api/login")
            .send({username: correctUserName, password: correctPassword})
            .expect(401);

        const error = _.get(result, "body.error");

        expect(error).toBe("Invalid username or password");
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
