import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { User } from '../models/User'
import { Post } from '../models/Post'
import { Comment } from '../models/Comment'

const seq = () =>  {
    const sequelize = new Sequelize({
        database: 'testdb',
    
        username: 'testuser',
    
        password: 'testpassword',
    
        host: 'localhost',
    
        port: parseInt('5433', 10),
        dialect: 'postgres',
        models: [User, Post, Comment],
    })

    return sequelize
}

export {seq as sequelize}
