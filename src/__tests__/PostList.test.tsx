import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PostList from "../containers/home/components/post-list/PostList";
import { usePostList } from "../containers/home/hooks/usePostList";
import { MockedProvider } from "@apollo/client/testing";

// Mock the usePostList hook
jest.mock("../containers/home/hooks/usePostList", () => ({
  usePostList: jest.fn(),
}));

// Combine all react-router mocks into one
jest.mock("react-router", () => ({
  useLocation: jest.fn(() => ({
    pathname: "/",
  })),
  useNavigate: jest.fn(),
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("PostList", () => {
  const mockUsePostList = {
    get: {
      loading: false,
      error: null,
      posts: {
        posts: {
          nodes: [
            { id: "1", title: "Test Post 1", fields: [], reactions: [] },
            { id: "2", title: "Test Post 2", fields: [], reactions: [] },
          ],
          pageInfo: {
            hasNextPage: true,
          },
        },
      },
    },
    on: {
      loadMorePosts: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state", () => {
    (usePostList as jest.Mock).mockReturnValue({
      ...mockUsePostList,
      get: { ...mockUsePostList.get, loading: true },
    });
    render(
      <MockedProvider>
        <PostList />
      </MockedProvider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (usePostList as jest.Mock).mockReturnValue({
      ...mockUsePostList,
      get: { ...mockUsePostList.get, error: new Error("Test error") },
    });
    render(
      <MockedProvider>
        <PostList />
      </MockedProvider>
    );
    expect(screen.getByText("Error...")).toBeInTheDocument();
  });

  it("should render empty state when no posts are found", () => {
    (usePostList as jest.Mock).mockReturnValue({
      ...mockUsePostList,
      get: { ...mockUsePostList.get, posts: null },
    });
    render(
      <MockedProvider>
        <PostList />
      </MockedProvider>
    );
    expect(screen.getByText("No Post Found")).toBeInTheDocument();
  });

  it("should render post list without load more button when hasNextPage is false", () => {
    (usePostList as jest.Mock).mockReturnValue({
      ...mockUsePostList,
      get: {
        ...mockUsePostList.get,
        posts: {
          posts: {
            nodes: [
              { id: "1", title: "Test Post 1", fields: [], reactions: [] },
            ],
            pageInfo: { hasNextPage: false },
          },
        },
      },
    });
    render(
      <MockedProvider>
        <PostList />
      </MockedProvider>
    );
    expect(screen.queryByText("Show More")).not.toBeInTheDocument();
  });

  it("should call loadMorePosts when Show More button is clicked", () => {
    (usePostList as jest.Mock).mockReturnValue(mockUsePostList);
    render(
      <MockedProvider>
        <PostList />
      </MockedProvider>
    );
    fireEvent.click(screen.getByText("Show More"));
    expect(mockUsePostList.on.loadMorePosts).toHaveBeenCalledTimes(1);
  });
});
