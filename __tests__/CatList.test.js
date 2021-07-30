import React from "react";
import { create } from "react-test-renderer";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CatList from "../src/components/Cats/CatList/Catlist";

it("Renders correctly", () => {
  let breeds = [
    {
      url: "/test-url",
    },
  ];

  let tree = create(
    <MemoryRouter>
      <CatList breeds={breeds} />
    </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Sets the image url correctly", () => {
  let breeds = [
    {
      url: "/test-url-1",
    },
    {
      url: "/test-url-2",
    },
  ];

  let { container } = render(
    <MemoryRouter>
      <CatList breeds={breeds} />
    </MemoryRouter>
  );

  let cards = container.getElementsByClassName("card");
  expect(cards.length).toBe(breeds.length);
});
