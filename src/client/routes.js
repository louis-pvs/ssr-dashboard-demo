import * as Loadable from "react-loadable";
import PageLoader from "./view/PageLoader";
import { loadUserData } from "./components/User";

const Home = Loadable({
  loader: () => import("./Home"),
  loading: PageLoader,
  timeout: 5000
});
const LoadableUserPage = Loadable({
  loader: () => import("./components/User"),
  loading: PageLoader,
  timeout: 5000
});

export default [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/users",
    component: LoadableUserPage,
    loadData: loadUserData
  }
];
