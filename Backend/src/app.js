import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());


// route import
import userRouter from "./routes/user.route.js"
import superAdminRouter from "./routes/superAdmin.route.js"
import templeAdminRouter from "./routes/templeAdmin.route.js"
import templeDetailsRouter from "./routes/templeDetails.route.js"
import templeReviewRouter from "./routes/reviews.route.js"
import templeCarouselRouter from "./routes/carousel.route.js"

// route declaration 
app.use("/api/v1/users", userRouter);
app.use("/api/v1/superAdmin", superAdminRouter);
app.use("/api/v1/templeAdmin", templeAdminRouter);
app.use("/api/v1/templeDetails", templeDetailsRouter);
app.use("/api/v1/reviews", templeReviewRouter);
app.use("/api/v1/carousel", templeCarouselRouter);

// http://localhost:5000/api/v1/users/register
// http://localhost:5000/api/v1/users/login
// http://localhost:5000/api/v1/users/logout

export {app}