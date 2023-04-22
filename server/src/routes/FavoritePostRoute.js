import express from 'express';

import {checkLockAccount, verifyToken} from "../middleware/auth";
import {getFavoritePosts, toggleFavorite} from "../controllers/FavoriteController";

const router = express.Router()

router.post('/', verifyToken,checkLockAccount, toggleFavorite)
router.get('/', verifyToken, getFavoritePosts)



export default router
