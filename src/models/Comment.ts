import {Model, Table, Column, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement, CreatedAt, DataType} from 'sequelize-typescript'
import { User } from './User'
import { Post } from './Post'

@Table({ tableName: 'Comment' })
export class Comment extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER, // Specify the data type as INTEGER
    })
    id!: number

    @Column({
        type: DataType.STRING, // Specify the data type as STRING
      })
    text!: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING, // Specify the data type as STRING
      })
    userName!: string

    @BelongsTo(() => User, 'userName')
    user!: User

    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER, // Specify the data type as INTEGER
    })
    postId!: number

    @BelongsTo(() => Post, 'postId')
    post!: Post

    @CreatedAt
    createdAt!: Date; 

}