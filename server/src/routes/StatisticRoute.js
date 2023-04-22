import express from 'express';

import {getInfo} from "../controllers/StatisticController";

const router = express.Router()

router.get('/', getInfo)



export default router
