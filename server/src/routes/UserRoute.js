import express from 'express';
import {verifyToken} from "../middleware/auth";
import {
    createCollaboratorAccount,
    getAllAccounts,
    getProfile,
    getProfileById,
    lockAccount,
    updateAccount
} from "../controllers/UserController";

const router = express.Router()

router.get(`/me`, verifyToken, getProfile)
router.put(`/:id`, verifyToken, updateAccount)
router.get(`/:id`, getProfileById)
router.get(`/`, verifyToken, getAllAccounts)
router.post(`/lock/:id`, verifyToken, lockAccount)
router.post(`/collaborator`, verifyToken, createCollaboratorAccount)



export default router
