import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { User } from '../models/User'
import { Post } from '../models/Post'
import { Comment } from '../models/Comment'

const seq = () =>{
    const sequelize: Sequelize = new Sequelize( {
            database: process.env.DB_NAME,

            username: process.env.DB_USER,

            password: process.env.DB_PASSWORD,

            host: process.env.DB_HOST,

            port: parseInt(process.env.DB_PORT || '5432', 10),
            dialect: 'postgres',
            models: [User, Post, Comment],
        })
    
     
    
    
    return sequelize
    
}



export {seq as sequelize}