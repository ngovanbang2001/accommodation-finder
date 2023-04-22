import {httpCodes} from "../configs/config";
import db from "../models"
import {uploadImage} from "../utils/uploadMedia";

export const addMessage = async (req, res) => {
    try {
        const {chatId, senderId, content, image, video} = req.body
        const data = {chatId, senderId}
        const chat = await db.Chat.findOne({where: {id: chatId}})
        let urlImg = null
        let lastMessage = null
        if (image) {
            urlImg = await uploadImage(image)
            if (urlImg) {
                data.image = urlImg
            }
            lastMessage = 'Đã gửi file đa phương tiện'
        }
        let urlVideo = null
        if (video) {
            urlVideo = await uploadImage(video)
            if (urlVideo) {
                data.video = urlVideo
            }
            lastMessage = 'Đã gửi file đa phương tiện'
        }
        if (content) {
            data.content = content
            if (!lastMessage) {
                lastMessage = content
            }
        }
        const message = await db.Message.create({...data})
        if (message) {
            let dataUpdate = {}
            if (senderId === chat.userId1) {
                dataUpdate = {isUser2NewChat: 1, isUser1NewChat: 0}
            } else {
                dataUpdate = {isUser1NewChat: 1, isUser2NewChat:0}
            }
            await db.Chat.update({
                createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '), ...dataUpdate,
                lastMessage,
                senderLastMessage: senderId
            }, {where: {id: chatId}})
            res.status(httpCodes.SUCCESS).json(message)
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}

export const getMessages = async (req, res) => {
    try {
        const {chatId} = req.params
        const {offset, limit} = req.query
        if (chatId) {
            const messages = await db.Message.findAndCountAll({
                where: {chatId},
                offset: +offset || 0,
                limit: +limit || 20,
                order: [['createdAt', 'DESC']]
            })
            if (messages) {
                res.status(httpCodes.SUCCESS).json(messages)
            }
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}