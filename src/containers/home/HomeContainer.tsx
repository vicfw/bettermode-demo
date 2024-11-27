import PostList from "./components/post-list/PostList";

const HomeContainer = () => {
  return (
    <main className="m-auto md:w-1/3 w-full py-10">
      <PostList data-testid="post-list" />
    </main>
  );
};

export default HomeContainer;
