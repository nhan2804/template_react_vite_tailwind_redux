import Text2Img from "@modules/text2img";
import { lazy } from "react";

const homeRoute = [
  {
    path: "/",
    component: Text2Img,
    exact: true,
  },
];
export default homeRoute;
