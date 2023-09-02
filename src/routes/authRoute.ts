import express, {Router} from 'express'
import {register} from '../auth/register'
import {login} from '../auth/login'
import { registerMiddleware } from '../middleware/registerMiddleware'
import { loginMiddleware } from '../middleware/loginMiddleware'
const router: Router = express.Router()


router.post("/register", registerMiddleware, register)
router.post("/login", loginMiddleware, login)


export { router as AuthRoute } 