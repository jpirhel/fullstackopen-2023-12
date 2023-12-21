const _ = require("lodash");

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user");

    return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    const blogData = request.body;

    const title = _.get(blogData, "title");
    const url = _.get(blogData, "url");

    if (_.isEmpty(title) || _.isEmpty(url)) {
        return response.status(400).end();
    }

    const users = await User.find({});
    const user = users[0];

    blogData.user = user.id.toString();

    const blog = new Blog(blogData)


    const result = await blog.save();

    user.blogs = user.blogs.concat(blog.id);

    await user.save();

    return response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id;

    await Blog.findByIdAndDelete(id);

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
