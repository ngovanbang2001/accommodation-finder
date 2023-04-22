import express from "express";
import {handleDeposit, payment, paymentWithVNPay, test} from "../controllers/PaymentController";
import {checkLockAccount, verifyToken} from "../middleware/auth";

const router = express.Router()

// router.post('/', payment)
router.post('/:id', verifyToken,checkLockAccount, paymentWithVNPay)
router.get('/deposit', handleDeposit)

export default router