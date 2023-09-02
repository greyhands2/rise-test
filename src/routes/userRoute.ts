import express, {Router} from 'express'
import { allUsers } from '../controllers/userController'
import {PostRoute} from './postRoute'
import { CommentRoute } from './commentRoute'
import { requireAuth } from '../auth/requireAuth'
const router: Router = express.Router()

router.use('/:name/posts', PostRoute)
router.use('/:name/comments', CommentRoute)


router.use(requireAuth)
router.route("/")
.get(allUsers)






export {router as UserRoute}