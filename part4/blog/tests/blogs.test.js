const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blog");

// noinspection DuplicatedCode
const sourceMaterialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
];

const api = supertest(app);

beforeEach(async () => {
    // delete existing blogs, if any
    await Blog.deleteMany({});

    // create blog objects
    const blogObjects = sourceMaterialBlogs.map((blogData) => new Blog(blogData));
    const saves = blogObjects.map((blog) => blog.save());

    // execute promises
    await Promise.all(saves);
});

describe('blogs', () => {
   test('the correct number of blogs are returned as JSON', async () => {
       const result = await api
           .get("/api/blogs")
           .expect(200)
           .expect('Content-Type', /application\/json/)

       const blogs = result.body;
       const numBlogs = blogs.length;

       expect(numBlogs).toBe(6);
   });

   test('a blog post contains the property id', async () => {
       const result = await api
           .get("/api/blogs")
           .expect(200)
           .expect('Content-Type', /application\/json/);

       const blogs = result.body;
       const firstBlog = blogs[0];

       expect(firstBlog.id).toBeDefined()
   });
});

afterAll(async () => {
    await mongoose.connection.close();
});
