import express from 'express';
import {
    createPostType,
    deletePostType,
    getPostType,
    getPostTypes,
    updatePostType
} from "../controllers/PostTypeController";

const router = express.Router()

router.post('/', createPostType)
router.put('/:id', updatePostType)
router.get('/', getPostTypes)
router.get('/:id', getPostType)
router.delete('/:id', deletePostType)


export default router