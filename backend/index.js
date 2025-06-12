import express from "express";
import cookie from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/jobs.route.js";
import Applicationrouter from "./routes/application.route.js";
dotenv.config({});

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(cookie());
app.use(express.json());
const corOption={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corOption));
app.use('/api/user',userRoute);
app.use('/api/company',companyRoute);
app.use('/api/job',jobRoute);
app.use('/api/application',Applicationrouter)

app.listen(process.env.PORT,(req,res)=>{
    connection()
    console.log("listning");
})