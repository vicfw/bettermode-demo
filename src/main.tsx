import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { API_URL, TOKEN } from "./constants";
import "./index.css";
import RouteRenderer from "./routes/RouteRenderer";
import { routes } from "./routes/routes";

const token = localStorage.getItem("token");

const client = new ApolloClient({
  link: new HttpLink({
    uri: API_URL,
    credentials: "same-origin",
    headers: {
      authorization: `Bearer ${TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <RouteRenderer routes={routes} isAuthenticated={true} />
    </BrowserRouter>
  </ApolloProvider>
);
