import {httpCodes} from "../configs/config";
import db from '../models'
export const getInfo = async (req, res) => {
  try {
    const accountTotal = await db.User.count({where:{role: 0}})
    const postTotal = await db.Post.count()
    return res.status(httpCodes.SUCCESS).json({accountTotal, postTotal})
  }catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}