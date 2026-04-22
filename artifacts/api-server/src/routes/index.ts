import { Router, type IRouter } from "express";
import healthRouter from "./health";
import appsRouter from "./apps";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminRouter);
router.use(appsRouter);

export default router;
