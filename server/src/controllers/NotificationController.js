import {httpCodes} from "../configs/config";
import db from "../models"

export const getNotification = async (req, res) => {
  try {
    const {user} = req
    const {offset, limit} = req.query
    if (user.id) {
      const notifications = await db.Notification.findAndCountAll({
        where: {userId: user.id},
        offset: +offset,
        limit: +limit,
        include: [
          {model: db.User, as: 'userNotification', attributes: ['avatar', 'displayName']}
        ],
        order: [['createdAt', 'DESC']],
        raw: true, nest: true
      })
      if (notifications) {
        res.status(httpCodes.SUCCESS).json({notifications: notifications.rows,total: notifications.count})
      }
      await db.Notification.update({isViewed: true}, {where: {userId: user.id, isViewed: false}})
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const getNumberNotificationUnViewed = async (req, res) => {
  try {
    const {user} = req
    if (user.id) {
      const notificationsData = await db.Notification.findAndCountAll({
        where: {userId: user.id, isViewed: 0}
      })
      if (notificationsData) {
        return res.status(httpCodes.SUCCESS).json({total: notificationsData.count})
      }
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const getNotificationUnViewed = async (req, res) => {
  try {
    const {user} = req
    const {offset, limit} = req.query
    if (user.id) {
      const notificationsData = await db.Notification.findAndCountAll({
        where: {userId: user.id, isViewed: 0},
        include: [
          {model: db.User, as: 'userNotification', attributes: ['avatar', 'displayName']}
        ],
        offset: +offset,
        limit: +limit,
        order: [['createdAt', 'DESC']],
        raw: true, nest: true
      })
      if (notificationsData) {
        return res.status(httpCodes.SUCCESS).json({
          notifications: notificationsData.rows,
          total: notificationsData.count
        })
      }
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const markNotificationRead = async (req, res) => {
  try {
    const {user} = req
    if (user.id) {
      const notificationsData = await db.Notification.update({isRead: 1}, {
        where: {id: req.params.id}
      })
      if (notificationsData) {
        return res.status(httpCodes.SUCCESS).json({ok: true})
      }
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const markAllNotificationViewed = async (req, res) => {
  try {
    const {user} = req
    if (user.id) {
      const notificationsData = await db.Notification.update({isViewed: 0}, {where: {userId: user.id}})
      if (notificationsData) {
        return res.status(httpCodes.SUCCESS).json({ok: true})
      }
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}


