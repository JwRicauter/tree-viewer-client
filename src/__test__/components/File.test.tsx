import React from "react";
import { render, screen } from "@testing-library/react";
import {act} from 'react-dom/test-utils';
import {File } from "../../components/File";

describe("<File />", () => {
  test("should display a file name", async () => {
    render(<File name={'index.js'} path={'index.js'}/>);
    const nameElement = screen.getByText(/index.js/i);
    expect(nameElement).toBeInTheDocument();
  });
});