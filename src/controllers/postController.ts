import {Request, Response, NextFunction} from 'express'
import { Post } from '../models/Post'
import { catchAsyncError } from '../helpers/catchAsyncError'
import { redis_client } from '../db/redis'

const createPost = catchAsyncError( async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const {title, content, userName} = req.body
    
    const newPost = await Post.create({title, content, userName})

    let cachedPosts = await redis_client.client.get('all-posts')
    let cachedUserPosts = await redis_client.client.get(`user-${userName}-all-posts`)

    

    if(cachedPosts){
        cachedPosts = JSON.parse(cachedPosts)
        cachedPosts.push(newPost)
        await redis_client.client.del('all-comments')
        await redis_client.client.set('all-comments', JSON.stringify(cachedPosts))
    }

    if(cachedUserPosts){
        cachedUserPosts = JSON.parse(cachedUserPosts)
        cachedUserPosts.push(newPost)
        await redis_client.client.del(`user-${userName}-all-posts`)
        await redis_client.client.set(`user-${userName}-all-posts`, JSON.stringify(cachedPosts))
    }

    
    


    return res.status(200).send({
        message: "Success",
        data: newPost
    })
})


const allPosts = catchAsyncError( async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    let result, data

    if(req.params.name){
        data = await redis_client.client.get(`user-${req.params.name}-all-posts`)
    } else {
        data = await redis_client.client.get('all-Posts')
    }


    if(data){
        result = JSON.parse(data)
        
    } else {
        let filter:{userName?:string}={};
        if(req.params.name){
            filter.userName = req.params.name
        }

        const posts: Post[] = await Post.findAll({where: filter})
        result = posts

        if(req.params.name){
            await redis_client.client.set(`user-${req.params.name}-all-posts`, JSON.stringify(posts))
        } else {
            await redis_client.client.set('all-posts', JSON.stringify(posts))
        }

    }    
    
    return res.status(200).send({
        message: "Success",
        data: result
    })
})

const onePost = catchAsyncError( async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    

    const post: Post | null = await Post.findOne({where: {id: req.params.id}})

    return res.status(200).send({
        message: "Success",
        data: post
    })
})


export {createPost, allPosts, onePost}
