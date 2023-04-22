import express from 'express';
import {getDistricts, getProvinces, getWards} from "../controllers/ProvinceController";

const router = express.Router()

router.get('/', getProvinces)
router.get('/district/:provinceCode', getDistricts)
router.get('/ward/:districtCode', getWards)


export default router