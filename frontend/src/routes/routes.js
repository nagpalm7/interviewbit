import PageLayout from "../layouts/Layout";
import Home from "../pages/home/Home";

const routes = [
  {
    exact: false,
    path: "/",
    component: Home,
    layout: PageLayout,
  },
];

export default routes;
