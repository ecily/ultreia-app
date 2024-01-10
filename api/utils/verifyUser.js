import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    //access_token ist der name, so wie im cookie gespeichert
    const token = req.cookies.access_token
    //console.log(access_token)

    if (!token) return next(errorHandler(401, "Unauthorized"))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, "Token is not valid"))

        //=user ist die userinfo aus dem cookie
        req.user = user
        //an die nächste funktion überweisen, das ist updateUser aus der user.route.js
        next()
    })
}