import express, {Router} from 'express'

import { createComment, allComments, oneComment } from '../controllers/commentController'
import { requireAuth } from '../auth/requireAuth'
import { commentMiddleware } from '../middleware/commentMiddleware'
import { validateID } from '../helpers/validateParams'
const router: Router = express.Router({mergeParams: true})

router.use(requireAuth)



router.route("/")
.get(allComments)
.post(commentMiddleware, createComment)

router.route("/:id")
.get(validateID, oneComment)



export {router as CommentRoute}