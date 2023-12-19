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

module.exports = {
    dummy,
    totalLikes,
}
