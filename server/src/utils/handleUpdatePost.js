import db from "../models"

const {Op} = require("sequelize");
export const handleUpdatePost = async () => {
  try {
    const res = await db.Post.update({status: 3}, {
      where: {
        duration: {
          [Op.lt]: new Date().getTime()
        }
      }
    })
  } catch (e) {
    console.log(e)
  }
}