import _ from "lodash";

import React from "react";

import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";

import Blog from "./Blog";

describe("<Blog/>", () => {
    test("Blog renders title and author, but does not render URL or likes", async () => {
        const refresh = _.noop;

        const user = {}; // empty

        const blogData = {
            title: "Blog title",
            author: "Blog author",
            url: "https://example.com",
            likes: 100,
            user: {
                name: "Blog user name",
                username: "Blog user username",
            },
        };

        render(<Blog blog={blogData} user={user} refresh={refresh}/>);

        // blog title is visible

        const titleElement = screen.getByText("Blog title", {exact: false});

        expect(titleElement).toBeVisible();

        // blog author is visible

        const authorElement = screen.getByText("Blog author", {exact: false});

        expect(authorElement).toBeVisible();

        // URL is not visible
        const urlElement = screen.getByText("example.com", {exact: false});

        expect(urlElement).not.toBeVisible();

        // likes are not visible
        const likesElement = screen.getByText("100", {exact: false});

        expect(likesElement).not.toBeVisible();
    });
});