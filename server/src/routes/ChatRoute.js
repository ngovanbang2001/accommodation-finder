import express from 'express';
import {
    createChat,
    getChat,
    getNumberChatHasNewMessage,
    getuserChats,
    markViewedChat
} from "../controllers/ChatController";
import {checkLockAccount, verifyToken} from "../middleware/auth";

const router = express.Router()

router.post('/', verifyToken, checkLockAccount, createChat)
router.get('/:userId', verifyToken, getuserChats)
router.get('/test/:id', verifyToken, getChat)
router.get('/numberNewMessage/:id', verifyToken, getNumberChatHasNewMessage)
router.post('/markViewedChat/:id', verifyToken, markViewedChat)


export default router