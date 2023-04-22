import express from 'express';
import {checkLockAccount, verifyToken} from "../middleware/auth";
import {
    approvePost,
    createPost,
    filterPost,
    getAllPost,
    getPostById, getPostByUser, getRelatedPost, searchPost, sortPost,
} from "../controllers/PostController";

const router = express.Router()

router.post(`/`, verifyToken,checkLockAccount, createPost)
router.get(`/all`, getAllPost)
router.get(`/postsByUser`, getPostByUser)
router.get(`/:id`, getPostById)
router.post(`/filterPost`, filterPost)
router.get(`/sortPost`, sortPost)
router.post(`/approvePost/:id`, verifyToken, approvePost)
router.get(`/`, searchPost)
router.get(`/related/:id`, getRelatedPost)


export default router
