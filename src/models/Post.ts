import {Model, Table, Column, ForeignKey, BelongsTo, HasMany, PrimaryKey, AutoIncrement, CreatedAt, DataType} from 'sequelize-typescript'

import {User} from './User'
import {Comment} from './Comment'

@Table({ tableName: 'Post' })
export class Post extends Model {
   
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER, // Specify the data type as INTEGER
    })
    id!: number


    @Column({
        type: DataType.STRING, // Specify the data type as STRING
      })
   title!: string
   
   @Column({
    type: DataType.STRING, // Specify the data type as STRING
  })
   content!: string


   @ForeignKey(() => User)
   @Column({
    type: DataType.STRING, // Specify the data type as STRING
  })
   userName!: string

   @BelongsTo(() => User, 'userName')
   user!: User;

   @HasMany(() => Comment, 'postId')
   comments!: Comment[]

   @CreatedAt
   createdAt!: Date;

}