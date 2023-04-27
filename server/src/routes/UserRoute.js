import express from 'express'
import { verifyToken } from '../middleware/auth'
import {
  getAllAccounts,
  getProfile,
  getProfileById,
  lockAccount,
  updateAccount,
} from '../controllers/UserController'

const router = express.Router()

router.get(`/me`, verifyToken, getProfile)
router.put(`/:id`, verifyToken, updateAccount)
router.get(`/:id`, getProfileById)
router.get(`/`, verifyToken, getAllAccounts)
router.post(`/lock/:id`, verifyToken, lockAccount)

export default router
