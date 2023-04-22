const jwt = require('jsonwebtoken');
const {httpCodes} = require("../configs/config");
import db from "../models"
require('dotenv').config()

const verifyToken = (req, res, next) =>  {
    const accessToken = req.headers["authorization"] && req.headers["authorization"].split(" ")[1]
    if(!accessToken) {
        return res.sendStatus(httpCodes.UNAUTHORIZED);
    }
    else {
        try {
            req.user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            next()
        }catch (e) {
            if (e.name === "TokenExpiredError") {
                return res.sendStatus(httpCodes.TOKEN_EXPIRED)
            }
            return res.sendStatus(httpCodes.INVALID_ACCESS_TOKEN)
        }
    }
}

const verifyRefreshToken = (req, res, next) =>  {
    const {refreshToken} = req.body
    if(!refreshToken) {
        return res.sendStatus(httpCodes.UNAUTHORIZED);
    }
    else {
        try {
            req.user = jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN_SECRET)
            next()
        }catch (e) {
            console.log(e)
            return res.sendStatus(httpCodes.INVALID_ACCESS_TOKEN)
        }
    }
}

const checkLockAccount = async (req, res, next) =>  {
   try {
    const account = await db.User.findOne({where: {id: req.user.id}})
       if(account.isActive) {
           next()
       }
       else {
           return res.status(422).json({msg: 'Account has been locked'})
       }
   }catch (e) {
       console.log(e)
       return res.sendStatus(httpCodes.UNKNOWN_ERROR)
   }
}


module.exports = {
    verifyToken,
    verifyRefreshToken,
    checkLockAccount
}