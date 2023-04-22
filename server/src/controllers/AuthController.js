import { httpCodes } from '../configs/config'
import db from '../models'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const uuid = require('uuid')
const bcrypt = require('bcrypt')

dotenv.config()

function generateToken(user) {
  try {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '24h',
    })

    const refreshToken = jwt.sign(user, process.env.REFRESH_ACCESS_TOKEN_SECRET, {
      expiresIn: '72h',
    })
    return { accessToken, refreshToken }
  } catch (e) {
    console.log(e)
  }
}

export const login = async (req, res) => {
  try {
    const { token, fcmToken } = req.body
    if (token) {
      const decodedToken = jwt.decode(token)
      let userData = {}
      if (decodedToken) {
        userData = {
          displayName: decodedToken.name || 'Người dùng mới',
          email: decodedToken.email,
          phoneNumber: decodedToken.phone_number,
          from: decodedToken.firebase.sign_in_provider,
          uid: decodedToken.user_id,
          avatar:
            decodedToken.picture ||
            'https://res.cloudinary.com/dqrn1uojt/image/upload/v1673227384/avatar_default_lqsou9.png',
        }
      }
      if (Date.now() < decodedToken.exp * 1000) {
        try {
          const account = await db.User.findOne({ where: { uid: userData.uid } })
          let userRes = {}
          let tokens = {}
          if (!account) {
            const userDb = await db.User.create({ ...userData, role: 0, isActive: 1 })
            userRes = { ...userData, id: userDb.id }
            tokens = generateToken(userRes)
          } else {
            if (account.isActive) {
              userRes = { ...userData, displayName: account.displayName, id: account.id }
              tokens = generateToken(userRes)
            } else {
              return res.status(422).json({ msg: 'Account has been locked' })
            }
          }
          const sessionId = uuid.v4()
          await db.Session.create({ userId: userRes.id, fcmToken, sessionId })
          return res
            .status(httpCodes.SUCCESS)
            .json({ account: { ...userRes }, ...tokens, sessionId })
        } catch (e) {
          console.log(e)
          return res.status(httpCodes.UNKNOWN_ERROR)
        }
      }
      return res.status(httpCodes.TOKEN_EXPIRED)
    }
    return res.status(httpCodes.UNAUTHORIZED)
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const refreshToken = async (req, res) => {
  try {
    const { user } = req
    delete user.iat
    delete user.exp
    const { accessToken, refreshToken } = generateToken(user)
    return res.status(httpCodes.SUCCESS).json({ accessToken, refreshToken, user })
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const signUp = async (req, res) => {
  try {
    const { email, password, username } = req.body
    const userData = {
      username,
      displayName: 'Người dùng mới',
      email,
      uid: uuid.v4(),
      avatar:
        'https://res.cloudinary.com/dqrn1uojt/image/upload/v1673227384/avatar_default_lqsou9.png',
    }
    if (password && username && email) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          // Lưu hash vào cơ sở dữ liệu ở đây
          const userRes = await db.User.create({
            ...userData,
            password: hash,
            role: 0,
            isActive: 1,
          })
          return res.status(httpCodes.SUCCESS).json({ account: { ...userRes } })
        })
      })
    } else {
      return res.json({
        status: 'err',
        messgae: 'password, username, email is required',
      })
    }
  } catch (error) {
    console.log(error)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const loginWithPassword = async (req, res) => {
  try {
    const { username, password } = req.body
    if (username && password) {
      let account = await db.User.findOne({
        where: { username },
      })
      if (account) {
        bcrypt.compare(password, account.password, async function (err, result) {
          if (!err && result) {
            delete account.password
            const token = generateToken(account)
            try {
              const sessionId = uuid.v4()
              await db.Session.create({ userId: account.id, sessionId })
              return res.status(httpCodes.SUCCESS).json({ ...token, sessionId })
            } catch (e) {
              console.log(e)
            }
          } else {
            return res.sendStatus(httpCodes.BAD_REQUEST)
          }
        })
      } else {
        return res.sendStatus(httpCodes.BAD_REQUEST)
      }
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const logout = async (req, res) => {
  try {
    if (req.user.id) {
      try {
        const response = await db.Session.destroy({ where: { sessionId: req.body.sessionId } })
        if (response) {
          return res.status(httpCodes.SUCCESS).json({ ok: true })
        }
      } catch (e) {
        console.log(e)
        return res.sendStatus(httpCodes.UNKNOWN_ERROR)
      }
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}
