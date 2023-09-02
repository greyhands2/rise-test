import express, {Router} from 'express'
import {CommentRoute} from './commentRoute'
import {createPost, allPosts, onePost} from '../controllers/postController'
import { requireAuth } from '../auth/requireAuth'
import { postMiddleware } from '../middleware/postMiddleware'
import { validateID, validateName } from '../helpers/validateParams'

const router: Router = express.Router({mergeParams: true})

router.use(requireAuth)

router.use('/:id/comments', validateID, CommentRoute)

router.route("/")
.get(allPosts)
.post(postMiddleware, createPost)

router.route("/:id")
.get(validateID, onePost)



export {router as PostRoute}