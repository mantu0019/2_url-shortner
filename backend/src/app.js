import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import urlRouter from "./routes/url.routes.js";
import cors from "cors"

const app = express();

app.use(cors({
    origin:"http://localhost:5173"
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/url/", urlRouter);

export default app;
