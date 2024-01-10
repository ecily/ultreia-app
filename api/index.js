import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"

mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to mongo")
}).catch((err) => {
    console.log(err)
})

const app = express()
//default ändern, so dass auch json an den server gesendet werden darf aus postman
app.use(express.json())

app.use(cookieParser())

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})


app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Generic error"
    return res.status(statusCode).json({
        success: false,
        //bis es6 musste es heissen statusCode: statusCode.
        //seither ist es so ok, wenn key und variable gleich sind
        statusCode,
        message
    })
})