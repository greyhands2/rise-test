import {Request, Response, NextFunction } from 'express'
import { Comment } from '../models/Comment'
import { catchAsyncError } from '../helpers/catchAsyncError'
import { redis_client } from '../db/redis'

const createComment = catchAsyncError(async(req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const {text, postId, userName} = req.body

    const newComment = await Comment.create({
        text,
        postId,
        userName
    })

    let cachedComments = await redis_client.client.get('all-comments')
    let cachedPostComments = await redis_client.client.get(`post-${userName}-all-comments`)

    let cachedUserComments = await redis_client.client.get(`user-${userName}-all-comments`)

    if(cachedComments){
        cachedComments = JSON.parse(cachedComments)
        cachedComments.push(newComment)
        await redis_client.client.del('all-comments')
        await redis_client.client.set('all-comments', JSON.stringify(cachedComments))
    }

    if(cachedUserComments){
        cachedUserComments = JSON.parse(cachedUserComments)
        cachedUserComments.push(newComment)
        await redis_client.client.del(`user-${userName}-all-comments`)
        await redis_client.client.set(`user-${userName}-all-comments`, JSON.stringify(cachedComments))
    }

    if(cachedPostComments){
        cachedPostComments = JSON.parse(cachedPostComments)
        cachedPostComments.push(newComment)
        await redis_client.client.del(`post-${userName}-all-comments`)
        await redis_client.client.set(`user-${userName}-all-comments`, JSON.stringify(cachedComments))
    }
    

    return res.status(200).send({
        message: "Success",
        data: newComment
    })
})

const allComments = catchAsyncError(async(req: Request, res: Response, next: NextFunction): Promise<Response> => {
    let result, data

    if(req.params.name){
        data = await redis_client.client.get(`user-${req.params.name}-all-comments`)
    } else if(req.params.id){
        console.log('i should be seen1')
        data = await redis_client.client.get(`post-${req.params.id}-all-comments`)
    } else {
        data = await redis_client.client.get('all-comments')
    }
    
            
            if(data){
                result = JSON.parse(data)
                
            } else {
                let filter:{userName?: string, postId?: number}={};
                if(req.params.name){
                    filter.userName = req.params.name
                }
            
                if(req.params.id){
                    filter.postId = parseInt(req.params.id)
                }
            
                const comments: Comment[] = await Comment.findAll({where: filter})
                result = comments


                if(req.params.name){
                    await redis_client.client.set(`user-${req.params.name}-all-comments`, JSON.stringify(comments))
                } else if(req.params.id){
                    await redis_client.client.set(`post-${req.params.id}-all-comments`, JSON.stringify(comments))
                } else {
                    await redis_client.client.set('all-comments', JSON.stringify(comments))
                }
            }
   
    return res.status(200).send({
        message: "Success",
        data: result
    })
})

const oneComment = catchAsyncError( async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    

    const comment: Comment | null = await Comment.findOne({where: {id: req.params.id}})

    return res.status(200).send({
        message: "Success",
        data: comment
    })
})



export {createComment, allComments, oneComment}