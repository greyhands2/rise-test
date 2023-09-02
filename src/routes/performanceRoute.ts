import express, {Router} from 'express'

import { performanceChallenge } from '../controllers/performanceChallengeController'
const router: Router = express.Router()



router.route("/top-3")
.get(performanceChallenge)






export {router as PerformanceRoute}