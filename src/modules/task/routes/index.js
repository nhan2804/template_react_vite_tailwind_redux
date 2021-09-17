import { lazy } from "react";
const ProjectDetail = lazy(() => import("../pages/project-detail"));
const TaskDetail = lazy(() => import("../pages/task-detail"));

const tasktRoutes = [
  {
    component: ProjectDetail,
    path: "/project/:projectId/tasks",
    isPrivate: true,
    exact: true,
  },
  {
    component: TaskDetail,
    path: "/project/:projectId/tasks/:taskId",
    isPrivate: true,
    exact: true,
  },
];
export default tasktRoutes;
