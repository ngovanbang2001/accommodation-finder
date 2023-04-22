import {httpCodes} from "../configs/config";
import db from "../models"

const {Op} = require("sequelize");
export const createChat = async (req, res) => {

    try {
        const {senderId: userId1} = req.body
        const {recevierId: userId2} = req.body

        if (userId1 && userId2) {
            try {
                const chat = await db.Chat.create({userId1, userId2})
                res.status(httpCodes.SUCCESS).json(chat)
            } catch (e) {
                console.log(e)
                res.sendStatus(httpCodes.UNKNOWN_ERROR)
            }
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}

export const getuserChats = async (req, res) => {
    try {
        const {userId} = req.params
        if (userId) {
            try {
                const chats = await db.Chat.findAll({
                    where: {
                        [Op.or]: [{userId1: userId}, {userId2: userId}]
                    },
                    order: [['updatedAt', 'DESC']]
                })
                res.status(httpCodes.SUCCESS).json(chats)
            } catch (e) {
                console.log(e)
                res.sendStatus(httpCodes.UNKNOWN_ERROR)
            }
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}

export const getChat = async (req, res) => {
    try {
        const {id} = req.params
        if (id) {
            const chat = await db.Chat.findOne({
                where: {
                    id
                }
            })
            res.status(httpCodes.SUCCESS).json(chat)
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}

export const getNumberChatHasNewMessage = async (req, res) => {
    try {
        const {id} = req.params
        const number1 = await db.Chat.findAndCountAll({
            where: {
                userId1: id,
                isUser1NewChat: 1
            }
        })
        const number2 = await db.Chat.findAndCountAll({
            where: {
                userId2: id,
                isUser2NewChat: 1
            }
        })
        return res.status(httpCodes.SUCCESS).json({total: number1.count + number2.count})
    } catch (e) {
        console.log(e)
        res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}

export const markViewedChat = async (req, res) => {
    try {
        const {id} = req.params
        await db.Chat.update({isUser1NewChat: 0, isUser2NewChat: 0}, {
            where: {
                [Op.or]: [{userId1: id}, {userId2: id}]
            }
        })
        return res.status(httpCodes.SUCCESS).json({ok: true})
    } catch (e) {
        console.log(e)
        res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}