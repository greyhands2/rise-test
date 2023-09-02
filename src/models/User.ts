import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, CreatedAt, DataType} from 'sequelize-typescript'

import {Post} from './Post'
import {Comment} from './Comment'

@Table({ tableName: 'User' })
export class User extends Model {
    
    @AutoIncrement
    @Column({
        type: DataType.INTEGER, // Specify the data type as INTEGER
    })
    id!: number

    @PrimaryKey
    @Column({
        type: DataType.STRING, // Specify the data type as STRING
      })
    name!: string

    @Column({
        type: DataType.STRING, // Specify the data type as STRING
      })
    password!: string

    @HasMany(() => Post, 'userName')
    posts!: Post[]

    @HasMany(() => Comment, 'userName')
    comments!: Comment[]

    @CreatedAt
    createdAt!: Date;
}