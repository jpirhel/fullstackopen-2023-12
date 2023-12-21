const _ = require("lodash");

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});

    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const title = _.get(blog, "title");
    const url = _.get(blog, "url");

    if (_.isEmpty(title) || _.isEmpty(url)) {
        response.status(400).end();
    } else {
        const result = await blog.save();
        response.status(201).json(result);
    }
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
