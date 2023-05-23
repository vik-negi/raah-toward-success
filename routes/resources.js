import { Router } from "express";
import resourceController from "../controllers/resourceController.js";
import checkUserAuth from "../middleware/auth-middleware.js";

const resourceRouter = Router();
resourceRouter.get("/get-resources", checkUserAuth, resourceController.getAllResources);
resourceRouter.post("/create-resource", checkUserAuth, resourceController.addResources);

export default resourceRouter;
