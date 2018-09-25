import * as Loadable from "react-loadable";

import App from "./App";
import RequireAuth from "./components/HOCs/RequireAuth";
import NotFound from "./view/NotFound";
import PageLoader from "./view/PageLoader";
import { loadUserData } from "./components/User";
import { loadAdminData } from "./components/Admin";
import { loadCurrentUser } from "./App";

const LoadableHome = Loadable({
  loader: () => import("./Home"),
  loading: PageLoader
});
const LoadableUserPage = Loadable({
  loader: () => import("./components/User"),
  loading: PageLoader
});
const LoadableAdminPage = Loadable({
  loader: () => import("./components/Admin"),
  loading: PageLoader
});

export default [
  {
    component: App,
    loadData: loadCurrentUser,
    path: "/",
    routes: [
      {
        path: "/",
        component: LoadableHome,
        exact: true
      },
      {
        path: "/users",
        component: LoadableUserPage,
        loadData: loadUserData
      },
      {
        path: "/admins",
        component: RequireAuth(LoadableAdminPage),
        loadData: loadAdminData
      },
      {
        component: NotFound
      }
    ]
  }
];
