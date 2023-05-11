import { httpCodes } from '../configs/config'
import db from '../models'
import moment from 'moment'
import { formatPrice, generateSecureHash, sortObject } from '../utils'

require('dotenv').config()
const qs = require('qs')

export const paymentWithVNPay = async (req, res) => {
  try {
    const tmnCode = 'R99MI2R2'
    let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
    const { amount } = req.body
    const data = {
      vnp_Amount: amount * 100,
      vnp_Command: 'pay',
      vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
      vnp_CurrCode: 'VND',
      vnp_IpAddr: '127.0.0.1',
      vnp_Locale: 'vn',
      vnp_OrderInfo: `Nap tien vao tai khoan ${req.user.id}. Số tiền ${formatPrice(amount)} VNĐ`,
      vnp_ReturnUrl: 'http://localhost:8006/payment/deposit',
      vnp_TmnCode: tmnCode,
      vnp_TxnRef: moment().format('HHmmss'),
      vnp_Version: '2.0.1',
    }

    data.vnp_SecureHash = generateSecureHash(data)
    const url = `${vnpUrl}?${qs.stringify(data, { encode: false })}`

    const depositData = {
      amount,
      depositId: data.vnp_TxnRef,
      userId: req.user.id,
      status: 0,
    }
    await db.Deposit.create(depositData)
    return res.status(httpCodes.SUCCESS).json({ url })
  } catch (e) {
    console.log(e)
    res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export async function handleDeposit(req, res) {
  // console.log(req.query)
  try {
    const { vnp_ResponseCode: responseCode } = req.query
    let data = { ...req.query }
    delete data.vnp_SecureHash
    data = sortObject(data)

    if (responseCode === '00' && req.query.vnp_SecureHash === generateSecureHash(data)) {
      await db.Deposit.update(
        {
          status: 1,
          bank: req.query.vnp_BankCode,
        },
        { where: { depositId: req.query.vnp_TxnRef } }
      )
      const deposit = await db.Deposit.findOne({ where: { depositId: req.query.vnp_TxnRef } })
      const user = await db.User.findOne({ where: { id: deposit.userId }, raw: false })
      if (user) {
        await user.increment('balance', { by: deposit.amount })
        res.redirect('http://localhost:3000/profile/me')
      }
    } else {
      res.redirect('http://localhost:3000/404')
    }
  } catch (e) {
    console.log(e)
    res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}
