import {httpCodes} from "../configs/config";
import {uploadImage} from "../utils/uploadMedia";

export const handleUploadImage = async (req,res) => {
  try {
    const {base64} = req.body
    console.log('base64',base64)
    if(base64) {
      const url = await uploadImage(base64)
      if(url) {
        return res.status(httpCodes.SUCCESS).json(url)
      }
    }
  }catch (e) {
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }

}