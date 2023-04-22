import express from 'express';
import {addMessage, getMessages} from "../controllers/MessageController";
import {checkLockAccount, verifyToken} from "../middleware/auth";

const router = express.Router()

router.post('/', verifyToken, checkLockAccount, addMessage)
router.get('/:chatId', getMessages)


export default router