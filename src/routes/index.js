import authRoute from "@modules/auth/routes";
import profileRoute from "@modules/profile/route";
import homeRoute from "@modules/home/routes";
import text2imgRoutes from "@modules/text2img/routes";
const routes = [...authRoute, ...profileRoute, ...homeRoute, ...text2imgRoutes];
export default routes;
