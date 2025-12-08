import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ProductList from "./ProductList.jsx";

test("renders 'No products found' when list is empty", () => {
  render(
    <MemoryRouter>
      <ProductList products={[]} />
    </MemoryRouter>
  );

  expect(screen.getByText(/no products found/i)).toBeInTheDocument();
});

test("renders product cards with correct info and links", () => {
  const products = [
    {
      id: 1,
      title: "Test Product",
      price: 9.99,
      image: "http://example.com/test.jpg",
    },
  ];

  render(
    <MemoryRouter>
      <ProductList products={products} />
    </MemoryRouter>
  );

  expect(screen.getByText("Test Product")).toBeInTheDocument();
  expect(screen.getByText("$9.99")).toBeInTheDocument();

  const link = screen.getByRole("link", { name: /test product/i });
  expect(link).toHaveAttribute("href", "/products/1");
});
