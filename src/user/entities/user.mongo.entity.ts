import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    _id:ObjectID

    @Column('text')
    name: string

    @Column('text')
    email: string

    @Column({ length: 11 })
    phone: string

}
