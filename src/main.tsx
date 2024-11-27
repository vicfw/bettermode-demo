import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Home from "./pages/home/Home";
import { API_URL, TOKEN } from "./constants";
import SinglePost from "./pages/single-post/SinglePost";
import FullHeightWrapper from "./components/FullHeightWrapper";

const httpLink = createHttpLink({
  uri: API_URL, // Replace with your GraphQL API endpoint
});

// Set up the context to include the Bearer token
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${TOKEN}`,
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Add the authLink before httpLink
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/posts">
          <Route path=":postId" element={<SinglePost />} />
        </Route>

        <Route
          path="*"
          element={<FullHeightWrapper text="404 - Not Found" />}
        />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
