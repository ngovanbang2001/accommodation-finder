import express from 'express'
import {
  addComment,
  addReplyComment,
  deleteComment,
  getComment,
  getReplyComment,
  updateComment,
} from '../controllers/CommentController'
import { checkLockAccount, verifyToken } from '../middleware/auth'

const router = express.Router()

router.post('/', verifyToken, checkLockAccount, addComment)
router.post('/reply', verifyToken, checkLockAccount, addReplyComment)
router.get('/:postId', verifyToken, getComment)
router.get('/reply/:commentId', verifyToken, getReplyComment)
router.put('/:commentId', verifyToken, checkLockAccount, updateComment)
router.delete('/:id', verifyToken, checkLockAccount, deleteComment)

export default router
