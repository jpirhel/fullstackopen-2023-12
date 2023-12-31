const listHelper = require("../utils/list_helper");

// blogs variable content copied from the source material
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

describe('dummy', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs);

        expect(result).toBe(1);
    });
});

describe('total likes copied from source material', () => {
    // copied from the source material
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ];

    // copied from the source material
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });
});

describe('total likes', () => {
    test('the number of likes for null variable should be 0', () => {
        const result = listHelper.totalLikes(null);
        expect(result).toBe(0);
    });

    test('the number of likes for string variable should be 0', () => {
        const result = listHelper.totalLikes("some string");
        expect(result).toBe(0);
    });

    test('the number of likes for empty array should be 0', () => {
        const result = listHelper.totalLikes([]);
        expect(result).toBe(0);
    });

    test('the number of likes should be the sum of the likes in the blog posts', () => {
        const result = listHelper.totalLikes(sourceMaterialBlogs);
        expect(result).toBe(36);
    });
});

describe('favorite blog', () => {
    test('favorite blog for null variable should be null', () => {
        const result = listHelper.favoriteBlog(null);
        expect(result).toBe(null);
    });

    test('favorite blog for string variable should be null', () => {
        const result = listHelper.favoriteBlog("some string");
        expect(result).toBe(null);
    });

    test('favorite blog for empty array should be null', () => {
        const result = listHelper.favoriteBlog([]);
        expect(result).toBe(null);
    });

    test('favorite blog should be the one with the maximum likes', () => {
        const result = listHelper.favoriteBlog(sourceMaterialBlogs);

        const correct = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        };

        expect(result).toEqual(correct);
    });
});

describe('most blogs for an author', () => {
    test('most blogs for null variable should be null', () => {
        const result = listHelper.mostBlogs(null);
        expect(result).toBe(null);
    });

    test('most blogs for string variable should be null', () => {
        const result = listHelper.mostBlogs("some string");
        expect(result).toBe(null);
    });

    test('most blogs for empty array should be null', () => {
        const result = listHelper.mostBlogs([]);
        expect(result).toBe(null);
    });

    test('most blogs for blogs variable should be the author with the most blogs', () => {
        const correct = {
            author: "Robert C. Martin",
            blogs: 3,
        };

        const result = listHelper.mostBlogs(sourceMaterialBlogs);

        expect(result).toEqual(correct);
    });
});

describe('most likes for an author', () => {
    test('most likes for null variable should be null', () => {
        const result = listHelper.mostLikes(null);
        expect(result).toBe(null);
    });

    test('most likes for string variable should be null', () => {
        const result = listHelper.mostLikes("some string");
        expect(result).toBe(null);
    });

    test('most likes for empty array should be null', () => {
        const result = listHelper.mostLikes([]);
        expect(result).toBe(null);
    });

    test('most likes for blogs should be the author with the most likes', () => {
        const correct = {
            author: "Edsger W. Dijkstra",
            likes: 17,
        };

        const result = listHelper.mostLikes(sourceMaterialBlogs);
        expect(result).toEqual(correct);
    });
});
