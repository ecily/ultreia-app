import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const test = (req, res) => {
    res.json({
        message: "hello from the controller"
    })
}

export const updateUser = async (req, res, next) => {
    //ist id aus dem cookie gleich req.params.id?
    if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"))
    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        //set-method um zu checken, welche der userdata geändert wurden
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
            //new true damit die aktuelle info aus dem form verwendet wird
        },{new: true})

        const {password, ...rest} = updatedUser._doc
        res.status(200).json(rest)
        
    } catch (error) {
        next(error)
    }
}