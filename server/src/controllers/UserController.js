import db from '../models'
import { httpCodes } from '../configs/config'
import { uploadImage } from '../utils/uploadMedia'

const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const saltRounds = 10
const uuid = require('uuid')
export const getProfile = async (req, res) => {
  try {
    const { user } = req
    try {
      const userData = await db.User.findOne({
        where: { id: user.id },
        exclude: ['password'],
      })

      return res.status(httpCodes.SUCCESS).json({ ...userData })
    } catch (e) {
      console.log(e)
      return res.sendStatus(httpCodes.BAD_REQUEST)
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const getProfileById = async (req, res) => {
  try {
    const userData = await db.User.findOne({
      where: { id: req.params.id },
      attributes: ['avatar', 'displayName', 'id'],
      raw: true,
      nest: true,
    })
    if (userData) {
      return res.status(httpCodes.SUCCESS).json(userData)
    } else {
      return res.sendStatus(httpCodes.BAD_REQUEST)
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const getAllAccounts = async (req, res) => {
  try {
    const { isActive, role, offset, limit, keyword } = req.query
    let where = {
      isActive: isActive
        ? isActive
        : {
            [Op.or]: [0, 1],
          },
      role:
        role >= 0
          ? role
          : {
              [Op.or]: [0, 1, 2],
            },
    }
    if (keyword) {
      where.displayName = { [Op.substring]: '%' + keyword + '%' }
    }
    const accounts = await db.User.findAndCountAll({
      where: { ...where },
      order: [['createdAt', 'DESC']],
      offset: +offset,
      limit: +limit,
      raw: true,
      nest: true,
    })
    if (accounts) {
      return res.status(httpCodes.SUCCESS).json({ accounts: accounts.rows, total: accounts.count })
    }
  } catch (e) {
    console.log(e)
    res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const updateAccount = async (req, res) => {
  try {
    if (req.body.base64) {
      req.body.avatar = await uploadImage(req.body.base64)
      delete req.body.base64
    }
    if (req.body.base64ImageCover) {
      req.body.imageCover = await uploadImage(req.body.base64ImageCover)
      delete req.body.base64ImageCover
    }
    const accounts = await db.User.update({ ...req.body }, { where: { id: req.params.id } })
    if (accounts) {
      return res.status(httpCodes.SUCCESS).json({ ok: true })
    }
  } catch (e) {
    console.log(e)
    res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const lockAccount = async (req, res) => {
  try {
    const account = await db.User.findOne({ where: { id: req.user.id } })
    if (account.role === 1) {
      const accounts = await db.User.update({ ...req.body }, { where: { id: req.params.id } })
      if (accounts) {
        return res.status(httpCodes.SUCCESS).json({ ok: true })
      }
    } else {
      await db.Session.destroy({ where: { userId: req.user.id } })
      return res.sendStatus(httpCodes.INVALID_ACCESS_TOKEN)
    }
  } catch (e) {
    console.log(e)
    res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const createCollaboratorAccount = async (req, res) => {
  try {
    const account = await db.User.findOne({ where: { id: req.user.id } })

    if (account.role === 1) {
      let { username, displayName, password } = req.body

      await bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (!err) {
          const account = await db.User.create({
            username,
            displayName,
            password: hash,
            avatar:
              'https://res.cloudinary.com/dqrn1uojt/image/upload/v1673227384/avatar_default_lqsou9.png',
            role: 1,
            from: 'CTV',
            uid: uuid.v4(),
          })
          if (account) {
            return res.status(httpCodes.CREATED).json({ account })
          }
        }
        return res.sendStatus(httpCodes.BAD_REQUEST)
      })
    } else {
      return res.sendStatus(httpCodes.INVALID_ACCESS_TOKEN)
    }
  } catch (e) {
    console.log(e)
    res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}
