import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUSER = new User({ username, email, password: hashedPassword })
    try {
        await newUSER.save() 
        res.status(201).json("User created successfully")
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        //wenn validUser false ist 
        //die eigene error middleware 
        //error.js aus api/utils verwenden, 
        //die einen generischen fehler ausgibt
        if(!validUser) return next(errorHandler(404, "User not found"))
        //passwort hashed vs. normal aus dem body
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        //error mit middleware, wenn password nicht korrekt ist
        if (!validPassword) return next(errorHandler(401, "Incorrect login!"))
        //wenn user korrekt gefunden und password ok erfolg authentication 
        //cookie wird gesetzt
        //hash token mit id des users, im browser cookie setzen
        //jwt dafür installieren im ROOT
        
        //token erzeugen mit jwt
        //_id ist in Mongo so angelegt
        //SECRET in .env als zusätzlichen Schutz
        const token = jwt.sign({
            id: validUser._id},
            process.env.JWT_SECRET
            )
        //das passwort aus validUser entfernen, damit es
        //nicht zurückgesendet wird
        //destructure - pass deshalb, weil password schon oben benutzt wird
        //in MONGO ist die info in _doc gespeichert, deshalb muss
        //_doc destructured werden
        const { password: pass, ...rest } = validUser._doc
        //token als cookie setzen
        //access_token ist der name des cookies,
        //expires in 1000 tagen als beispiel
        //httpOnly damit keine 3rd party app auf den cookie zugreifen kann
        //zustäzliche info, staus und die validUser info
        res.cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 *60 *60 *1000)
        })
        .status(200)
        //nur den rest aus validUser ohne passwort zurückschicken
        .json(rest)

    } catch (error) {
        //middleware aus index.js verwenden
        next(error)
    }
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc
            res 
                .cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest)
        } else {
         //user anlegen
         //passwort ist required aber kommt nicht von goolge
         //deshalb ein password kreieren
         const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
         const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
         //jetzt den user mit dem generierten passwort anlegen
         const newUser = new User({
            username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
            email: req.body.email,
            password: hashedPassword,
            //das muss im model erweitert werden
            avatar: req.body.photo
        })
         await newUser.save()
         const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
         const { password: pass, ...rest } = newUser._doc
         res.cookie("access_token", token, {httpOnly: true }).status(200).json(rest)
        }
    } catch (error) {
        next(error)
    }
}