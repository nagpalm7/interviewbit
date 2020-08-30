import Interviewer from "../pages/interviewer/Interviewer";
import Interviewee from "../pages/interviewee/Interviewee.js";
import Interview from "../pages/interview/Interview";

const dashboard_routes = [
  {
    exact: true,
    path: "/interviewer",
    component: Interviewer,
  },
  {
    exact: true,
    path: "/interviewee",
    component: Interviewee,
  },
  {
    exact: true,
    path: "/interview",
    component: Interview,
  },
];

export default dashboard_routes;
