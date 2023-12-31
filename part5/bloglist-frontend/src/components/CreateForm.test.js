import React from "react";

import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import {fireEvent} from "@testing-library/react";

import CreateForm from "./CreateForm";

describe("<CreateForm/>", () => {
    test("Submitting CreateForm should submit correct data", async () => {
        const testUser = userEvent.setup();

        const correctTitle = "Blog title";
        const correctAuthor = "Blog author";
        const correctUrl = "https://example.com/";

        let onSubmitCalled = false;

        // const onSubmit = jest.fn((e) => e.preventDefault());
        const onSubmit = (title, author, url) => {
            expect(title).toEqual(correctTitle);
            expect(author).toEqual(correctAuthor);
            expect(author).toEqual(correctAuthor);

            onSubmitCalled = true;
        };

        render(<CreateForm onSubmit={onSubmit} />);

        const titleInput = screen.getByRole("textbox", {name: "Title"});
        await testUser.type(titleInput, correctTitle);

        const authorInput = screen.getByRole("textbox", {name: "Author"});
        await testUser.type(authorInput, correctAuthor);

        const urlInput = screen.getByRole("textbox", {name: "Url"});
        await testUser.type(urlInput, correctUrl);

        fireEvent.submit(screen.getByTestId("createform"));

        expect(onSubmitCalled).toBeTruthy();
    });
})
