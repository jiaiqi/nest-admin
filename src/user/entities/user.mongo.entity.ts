import { Column, Entity } from "typeorm";

@Entity()
export class User {

    @Column('text')
    name: string

    @Column('text')
    email: string

    @Column({ length: 11 })
    phone: string

}
