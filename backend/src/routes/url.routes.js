import { Router } from "express";
import { createShort_url, getAnalytics, getShortUrl } from "../controller/short_url.controller.js";
 const urlRouter = Router();



urlRouter.post("/create",createShort_url)
urlRouter.get("/:shortId",getShortUrl)
urlRouter.get("/get-analytics/:shortId",getAnalytics)



export default urlRouter;
