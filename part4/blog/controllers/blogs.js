const _ = require("lodash");

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user");

    return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    const userData = request.user;
    const id = _.get(userData, "id");

    const user = await User.findById(id);

    if (_.isEmpty(user)) {
        return response.status(401).end();
    }

    const blogData = request.body;

    const title = _.get(blogData, "title");
    const url = _.get(blogData, "url");

    if (_.isEmpty(title) || _.isEmpty(url)) {
        return response.status(400).end();
    }

    blogData.user = user.id.toString();

    const blog = new Blog(blogData)

    const result = await blog.save();

    user.blogs = user.blogs.concat(blog.id);

    await user.save();

    return response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
    const userData = request.user;

    const userId = _.get(userData, "id");

    const user = await User.findById(userId);

    if (_.isEmpty(user)) {
        return response.status(401).send({error: "login required"});
    }

    const blogId = request.params.id;

    const blog = await Blog.findById(blogId);

    if (_.isEmpty(blog)) {
        // deleting a non-existing blog is ok
        return response.status(200).end();
    }

    let blogUserId;

    try {
        blogUserId = blog.user.toString();
    } catch (e) {
        return response.status(400).send({error: "blog user not found"});
    }

    const blogAuthorIsUser = blogUserId === user.id;

    if (! blogAuthorIsUser) {
        return response.status(401).send({error: "authorization failed"});
    }

    // blog author is user - delete blog

    await Blog.findByIdAndDelete(blogId);

    return response.status(200).end();
});

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id;
    const content = request.body;

    const options = {new: true, upsert: false};

    // check that the blog is found by ID before updating

    try {
        const blog = await Blog.findById(id);

        if (_.isEmpty(blog)) {
            return response.status(400).end();
        }
    } catch (e) {
        return response.status(400).end();
    }

    // update blog

    try {
        const result = await Blog.findByIdAndUpdate(id, content, options);

        return response.status(200).send(result);
    } catch (e) {
        return response.status(400).end();
    }
});

module.exports = blogsRouter;
