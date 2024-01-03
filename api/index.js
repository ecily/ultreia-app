import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
import userRouter from "./routes/user.route.js"

mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to mongo")
}).catch((err) => {
    console.log(err)
})

const app = express()
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

//als beispiel, in der praxis werden routes und die funktionen in eigenen folder und files gelegt
//app.get("/test", (req, res) => {
    //res.send("Hello ecily")
    //res.json({
       // message: "hello world"
    //})
//})

app.use("/api/user", userRouter)