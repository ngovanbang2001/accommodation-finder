import {httpCodes} from "../configs/config";
import db from '../models'

export const toggleFavorite = async (req, res) => {
    try {
        const {userId, postId} = req.body
        if (userId && postId) {
            const data = await db.FavoritePost.findOne({where: {userId, postId}})
            if (!data) {
                await db.FavoritePost.create({userId, postId})
            } else {
                await db.FavoritePost.destroy({where: {userId, postId}})
            }
            return res.status(httpCodes.CREATED).json({ok: true})
        } else {
            return res.sendStatus(httpCodes.BAD_REQUEST)
        }
    } catch (e) {
        console.log(e)
        return res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}

export const getFavoritePosts = async (req, res) => {
    try {

            const data = await db.FavoritePost.findAll({
                where: {userId: req.user.id},
                include: [
                    {model: db.Post, as: 'post', where: {status: 1, isActive: 1}},
                    {model: db.User, as: 'userFavorite', attributes: ['avatar', 'displayName', 'phoneNumber', 'id']}
                ],
                raw: true,
                nest: true
            })
        if(data) {
            const favoritePosts = data.map((item) => {
               const postData =   {
                   ...item.post,
                   images: JSON.parse(item.post.images.split(',')),
               }
                return {
                    ...item,
                    post: {...postData}
                }
            })
            return res.status(httpCodes.SUCCESS).json({favoritePosts: favoritePosts})
        }
        else {
            return res.sendStatus(httpCodes.BAD_REQUEST)
        }

    } catch (e) {
        console.log(e)
        return res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}