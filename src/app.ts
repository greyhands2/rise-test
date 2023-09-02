import express, {Express} from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

import xss from 'xss-clean'
import compression from 'compression'
import {ErrorHandler} from './error/middleware/ErrorHandler'
import {NotFoundError} from './error/NotFoundError'
import { AuthRoute } from './routes/authRoute'
import { UserRoute } from './routes/userRoute'
import { CommentRoute } from './routes/commentRoute'
import { PostRoute } from './routes/postRoute'
import { PerformanceRoute } from './routes/performanceRoute'
import { validateToken } from './auth/helper/jwt/validateToken'
const app:Express = express()
app.enable('trust proxy');


//enabling cors
app.use(cors())
app.options('*', cors())
app.use(helmet())


//data sanitization xSS attack
app.use(xss());


const limiter = rateLimit({
    // Your other rate-limiting options
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, try again in an hour',
    // Use a custom function to get the client's IP address
    keyGenerator: (req) => {
      return req.ip; // Use Express's built-in method to get the client's IP
    },
});


app.use('/rise', limiter);


app.use(compression())
app.use(json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }));


app.use('/rise/auth', AuthRoute)
app.use('/rise/performance-challenge', PerformanceRoute)
//collect token from request for endpoints that require it
app.use(validateToken)
app.use('/rise/users', UserRoute)
app.use('/rise/comments', CommentRoute)
app.use('/rise/posts', PostRoute)

 


app.all("*", (req,res)=>{
    res.send("Welcome to RiseVest API Test 😁😁😁")
})

app.use(ErrorHandler)

export {app}