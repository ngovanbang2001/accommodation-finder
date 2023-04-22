import express from 'express'
import {
  login,
  loginWithPassword,
  logout,
  refreshToken,
  signUp,
} from '../controllers/AuthController'
import { verifyRefreshToken, verifyToken } from '../middleware/auth'

const router = express.Router()

router.post('/login', login)
router.post('/refreshToken', verifyRefreshToken, refreshToken)
router.post('/logout', verifyToken, logout)
router.post('/loginWithPassword', loginWithPassword)
router.post('/sign-up', signUp)

export default router
