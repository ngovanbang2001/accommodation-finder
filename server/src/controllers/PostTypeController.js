import {httpCodes} from "../configs/config";
import db from "../models"

export const createPostType = async (req, res) => {

    try {
        if (req.body) {
            req.body.status = 1
            const postType = await db.PostType.create(req.body)
            if (postType) {
                return res.status(httpCodes.CREATED).json({postType})
            } else {
                return res.sendStatus(httpCodes.UNKNOWN_ERROR)
            }
        }
    } catch (e) {
        console.log(e)
        return res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}

export const updatePostType = async (req, res) => {
    try {
        const {id} = req.params

        if (req.body) {

            const postType = await db.PostType.update({...req.body}, {where: {id}})
            if (postType) {
                return res.status(httpCodes.SUCCESS).json({ok: true})
            } else {
                return res.sendStatus(httpCodes.UNKNOWN_ERROR)
            }
        }
    } catch (e) {
        console.log(e)
        return res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}

export const getPostType = async (req, res) => {
    try {
        const {id} = req.params

        const postType = await db.PostType.findOne({where: {id}})
        return res.status(httpCodes.SUCCESS).json({postType})
    } catch (e) {
        console.log(e)
        return res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}

export const getPostTypes = async (req, res) => {
    try {
        const {offset, limit, status} = req.query
        let where = {

        }
        if (status) {
            where.status = status
        }
        const response = await db.PostType.findAndCountAll({

            where: {...where},
            offset: +offset,
            limit: +limit,
            order: [['priceForDay', 'ASC']],
            raw: true,
            nest: true
        })
        return res.status(httpCodes.SUCCESS).json({postTypes: response.rows, total: response.count})
    } catch (e) {
        console.log(e)
        return res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}

export const deletePostType = async (req, res) => {
    try {
        await db.PostType.destroy({where: {id: req.params.id}})
        return res.status(httpCodes.SUCCESS).json({ok: true})
    } catch (e) {
        console.log(e)
        return res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}



