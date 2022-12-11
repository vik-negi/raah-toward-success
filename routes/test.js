import { Router } from "express";
import AmazonController from "../controllers/testController.js";

const testRouter = Router();

testRouter.post("/data1", AmazonController.test);
testRouter.get("/data2", AmazonController.products);

export default testRouter;
