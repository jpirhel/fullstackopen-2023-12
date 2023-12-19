const _ = require("lodash");

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    if (! Array.isArray(blogs)) {
        return 0;
    }

    if (blogs.length < 1) {
        return 0;
    }

    let likes = 0;

    blogs.forEach(blog => {
        likes += blog.likes;
    });

    return likes;
}

const favoriteBlog = (blogs) => {
    if (!Array.isArray(blogs)) {
        return null;
    }

    if (blogs.length < 1) {
        return null;
    }

    let maxLikes = 0;
    let favoriteBlog = null;

    blogs.forEach(blog => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes;
            favoriteBlog = blog;
        }
    });

    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes,
    };
}

const mostBlogs = (blogs) => {
    if (!Array.isArray(blogs)) {
        return null;
    }

    if (blogs.length < 1) {
        return null;
    }

    const counted = _.countBy(blogs, (blog) => blog.author);

    // NOTE could probably be also implemented using a lodash function

    let mostBlogsAuthor = null;
    let mostBlogsCount = 0;

    _.forEach(counted, (v, k) => {
        // console.log(`ZZZ v: ${v}, k: ${k}`);

        if (v > mostBlogsCount) {
            mostBlogsCount = v;
            mostBlogsAuthor = k;
        }
    });

    return {
        author: mostBlogsAuthor,
        blogs: mostBlogsCount,
    };
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}
