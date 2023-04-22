const cloudinary = require('cloudinary').v2
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY
})

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
    max_bytes: 25*1000000
}

const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if(result && result.secure_url) {
                return resolve(result.secure_url)
            }
            return reject({message: error.message})
        })
    })
}

const uploadMultipleImages = (images) => {
    return new Promise((resolve, reject) => {
        const uploads = images?.map(base => uploadImage(base))
        Promise.all(uploads).then((values) => resolve(values)).catch(err => reject(err))
    })
}

module.exports = {
    uploadImage,
    uploadMultipleImages
}