import express from 'express';
import {verifyToken} from "../middleware/auth";
import {handleUploadImage} from "../controllers/UploadImageController";


const router = express.Router()

router.post(`/`, verifyToken, handleUploadImage)



export default router