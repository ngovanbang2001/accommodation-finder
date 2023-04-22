import {httpCodes} from "../configs/config";
import db from "../models"
import {uploadImage} from "../utils/uploadMedia";
import {handlePushFCM} from "../configs/notification";
import {strToSlug} from "../utils";

export const addComment = async (req, res) => {
    try {
        const {postId, userId, content, base64Image, base64Video} = req.body
        const user = req.user
        if (postId && userId) {
            try {
                let imageAttach = ''
                let videoAttach = ''
                if (base64Image) {
                    imageAttach = await uploadImage(base64Image)
                }
                if (base64Video) {
                    videoAttach = await uploadImage(base64Video)
                }
                const comment = await db.Comment.create({postId, userId, content, imageAttach, videoAttach})
                const post = await db.Post.findOne({where: {id: postId}})
                const userLoggedIn = await db.Session.findOne({
                    where: {userId: +post.userId}, include: [
                        {model: db.User, as: 'userLoggedIn', attributes: ['avatar', 'displayName']}
                    ], raw: true, nest: true
                })
                // const userComment = await db.User.findOne({where: {id: accountId}})
                res.status(httpCodes.CREATED).json(comment)
                //send notification if user logged in
                if (userLoggedIn && userLoggedIn.userId !== req.user.id && userLoggedIn.fcmToken) {
                    const messages = {
                        notification: {
                            title: `${user.displayName} đã bình luận bài viết của bạn`,
                            body: 'Bạn có bình luận mới.'
                        },
                        token: userLoggedIn.fcmToken
                    }

                    await db.Notification.create({
                        userId: userLoggedIn.userId,
                        directLink: `/post/${strToSlug(post.title)}-${post.id}`,
                        type: 1,
                        content: `<div> <strong>${user.displayName}</strong> đã bình luận bài viết <strong>${post.title}</strong></div>`,
                        isRead: 0,
                        isViewed: 0
                    })
                    await handlePushFCM(messages)
                }
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

export const addReplyComment = async (req, res) => {

    try {
        const {userId, content, parentId, imageBase64, videoBase64, owner, postId} = req.body
        if (parentId && userId) {
            let imageAttach = ''
            let videoAttach = ''
            if (imageBase64) {
                imageAttach = await uploadImage(imageBase64)
            }
            if (videoBase64) {
                videoAttach = await uploadImage(videoBase64)
            }

            const replyComment = await db.Comment.create({userId, content, parentId, imageAttach, videoAttach, postId})
            const post = await db.Post.findOne({where: {id: postId}})
            const userLoggedIn = await db.Session.findOne({
                where: {userId: +owner}, include: [
                    {model: db.User, as: 'userLoggedIn', attributes: ['avatar', 'displayName']}
                ], raw: true, nest: true
            })

            if (userLoggedIn && userLoggedIn.userId !== req.user.id && userLoggedIn.fcmToken) {
                const messages = {
                    notification: {
                        title: `${req.user.displayName} đã trả lời bình luận của bạn`,
                        body: 'Bạn có bình luận mới.'
                    },
                    token: userLoggedIn.fcmToken
                }

                await db.Notification.create({
                    userId: userLoggedIn.userId,
                    directLink: `/post/${strToSlug(post.title)}-${post.id}`,
                    type: 1,
                    content: `<div> <strong>${req.user.displayName}</strong> đã trả lời bình luận của bạn</div>`,
                    isRead: 0,
                    isViewed: 0
                })
                await handlePushFCM(messages)
            }
            res.status(httpCodes.CREATED).json(replyComment)
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}

export const getComment = async (req, res) => {
    const {postId} = req.params
    const {user} = req
    if (postId) {
        try {
            const commentsData = await db.Comment.findAndCountAll({
                where: {postId, parentId: 0},
                offset: +req.query.offset,
                limit: +req.query.limit,
                include: [
                    {model: db.User, as: 'userComment', attributes: ['avatar', 'displayName']}
                ],
                raw: true,
                nest: true,
                order: [['createdAt', 'DESC']],
            })
            let childrens = []
            let data = []
            const {rows: comments} = commentsData
            for (let i = 0; i < comments.length; i++) {
                const temp = await db.Comment.findAndCountAll({
                    where: {parentId: comments[i].id},
                    order: [['createdAt', 'DESC']],
                    include: [
                        {model: db.User, as: 'userComment', attributes: ['avatar', 'displayName']}
                    ],
                    raw: true,
                    nest: true,
                })

                childrens.push(temp)
            }
            childrens.forEach((item, index) => {
                data.push({
                    ...comments[index],
                    isEdit: comments[index].userId === user.id,
                    isDelete: comments[index].userId === user.id,
                    firstChild: item.rows[0] ? [{
                        ...item.rows[0],
                        isEdit: item.rows[0].userId === user.id,
                        isDelete: item.rows[0].userId === user.id,
                    }] : null,
                    totalReply: item.count,
                })
            })
            res.status(httpCodes.SUCCESS).json({comments: data, total: commentsData.count})
        } catch (e) {
            console.log(e)
            res.sendStatus(httpCodes.UNKNOWN_ERROR)
        }
    }
}

export const getReplyComment = async (req, res) => {
    const {commentId} = req.params
    const {user} = req
    if (commentId) {
        try {
            const replyCommentsData = await db.Comment.findAndCountAll({
                where: {parentId: commentId},
                include: [
                    {model: db.User, as: 'userComment', attributes: ['avatar', 'displayName']}
                ],
                order: [['createdAt', 'DESC']],
                offset: +req.query.offset,
                limit: +req.query.limit,
                raw: true,
                nest: true,
            })
            let replyComments = []
            if (replyCommentsData.rows) {
                replyComments = replyCommentsData.rows.map(replyComment => {
                    return {
                        ...replyComment,
                        isEdit: replyComment.userId === user.id,
                        isDelete: replyComment.userId === user.id,
                    }
                })
                res.status(httpCodes.SUCCESS).json({replyComments, total: replyCommentsData.count})
            }
        } catch (e) {
            console.log(e)
            res.sendStatus(httpCodes.UNKNOWN_ERROR)
        }
    }
}

export const updateComment = async (req, res) => {
    const {contentUpdate, imageBase64, videoBase64} = req.body
    const {commentId} = req.params
    if (commentId) {
        let dataUpdate = {}

        try {
            if (imageBase64 === null) {
                dataUpdate.imageAttach = null
            } else if (imageBase64) {
                const url = await uploadImage(imageBase64)
                if (url) {
                    dataUpdate.imageAttach = url
                }
            }

            if (videoBase64 === null) {
                dataUpdate.videoAttach = null
            } else if (videoBase64) {
                const url = await uploadImage(videoBase64)
                if (url) {
                    dataUpdate.videoAttach = url
                }
            }
            if (contentUpdate) {
                dataUpdate.content = contentUpdate
            }
            const comment = await db.Comment.update({...dataUpdate}, {
                where: {id: commentId}
            })
            res.status(httpCodes.SUCCESS).json(comment)
        } catch (e) {
            res.sendStatus(httpCodes.UNKNOWN_ERROR)
        }
    }
}


export const deleteComment = async (req, res) => {
    const {id} = req.params
    if (id) {
        try {
            await db.Comment.destroy({where: {id}})
            await db.Comment.destroy({where: {parentId: id}})
            res.status(httpCodes.SUCCESS).json({"ok": true})
        } catch (e) {
            res.sendStatus(httpCodes.UNKNOWN_ERROR)
        }
    }
}




