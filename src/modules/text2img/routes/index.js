import { lazy } from "react";

const Text2Img = lazy(() => import("../"));
const text2imgRoutes = [
  {
    path: "/extra-text-from-image",
    component: Text2Img,
    exact: true,
    isPrivate: false,
  },
  {
    path: "/sharpen-image",
    component: Text2Img,
    exact: true,
    isPrivate: false,
  },
  {
    path: "/image-classification",
    component: Text2Img,
    exact: true,
    isPrivate: false,
  },
];
export default text2imgRoutes;
