import {httpCodes} from "../configs/config";
import db from "../models"

export const getProvinces = async(req, res) => {
    try {
        const provinces = await db.Province.findAll()
        return res.status(httpCodes.SUCCESS).json(provinces)
    }catch (e) {
        console.log(e)
        return res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}

export const getDistricts = async(req, res) => {
    try {
        const {provinceCode} = req.params
        if(provinceCode) {
           const districts = await db.District.findAll({where: {provinceCode}})
           return res.status(httpCodes.SUCCESS).json(districts)
       }
    }catch (e) {
        console.log(e)
        return res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}


export const getWards = async(req, res) => {
    try {
        const {districtCode} = req.params
        if(districtCode) {
            const wards = await db.Ward.findAll({where: {districtCode}})
            return res.status(httpCodes.SUCCESS).json(wards)
        }
    }catch (e) {
        console.log(e)
        return res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
}