import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import HomeContainer from "../containers/home/HomeContainer";

jest.mock("react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

test("should render home page", () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <HomeContainer />
    </MockedProvider>
  );
});

test("should maintain responsive layout structure", () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <HomeContainer />
    </MockedProvider>
  );
  const mainElement = screen.getByRole("main");
  expect(mainElement).toBeDefined();
  expect(mainElement.tagName.toLowerCase()).toBe("main");
});
