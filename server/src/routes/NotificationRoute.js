import express from 'express';
import {verifyToken} from "../middleware/auth";
import {
    getNotification, getNotificationUnViewed,
    getNumberNotificationUnViewed, markAllNotificationViewed,
    markNotificationRead,
} from "../controllers/NotificationController";

const router = express.Router()

router.get('/', verifyToken, getNotification)
router.get('/unViewed', verifyToken, getNumberNotificationUnViewed)
router.get('/unViewedNotification', verifyToken, getNotificationUnViewed)
router.post('/markRead/:id', verifyToken, markNotificationRead)
router.post('/markAllViewed', verifyToken, markAllNotificationViewed)


export default router