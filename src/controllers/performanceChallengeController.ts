import {Request, Response, NextFunction} from 'express'

import  {QueryTypes} from 'sequelize'
import { sequelize } from '../db/sequelize'

import { catchAsyncError } from "../helpers/catchAsyncError"






const performanceChallenge = catchAsyncError(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
     
    
                const result = await sequelize().query(`WITH UserPostCounts AS (
                    SELECT u."name", COUNT(p."id") AS "postCount"
                    FROM "User" u
                    LEFT JOIN "Post" p ON u."name" = p."userName"
                    GROUP BY u."name"
                    ORDER BY "postCount" DESC
                    LIMIT 3
                )
                
                SELECT u."name", u."name", "latestCommentCreatedAt", p."title", c."text"
                FROM UserPostCounts upc
                JOIN "User" u ON upc."name" = u."name"
                JOIN (
                    SELECT p."userName", p."title", "latestCommentCreatedAt", p."id" AS "postId"
                    FROM "Post" p
                    LEFT JOIN (
                    SELECT c."postId", MAX(c."createdAt") AS "latestCommentCreatedAt"
                    FROM "Comment" c
                    GROUP BY c."postId"
                    ) lc ON p."id" = lc."postId"
                ) p ON u."name" = p."userName"
                LEFT JOIN (
                    SELECT c."userName", c."postId", c."text"
                    FROM "Comment" c
                    JOIN (
                    SELECT "postId", MAX("createdAt") AS "latestCommentCreatedAt"
                    FROM "Comment"
                    GROUP BY "postId"
                    ) lc ON c."postId" = lc."postId" AND c."createdAt" = lc."latestCommentCreatedAt"
                ) c ON p."postId" = c."postId"
                ORDER BY upc."postCount" DESC;
                
                
            `, { type: QueryTypes.SELECT })
            
                
                
                
               
            

            
        
       
        return res.status(200).send({
            message:"Success",
            data: result
        })
})







export { performanceChallenge}