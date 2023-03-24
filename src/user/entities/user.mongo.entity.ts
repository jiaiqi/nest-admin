import { Entity, Column, Unique, UpdateDateColumn, ObjectIdColumn, CreateDateColumn, ManyToMany, JoinTable, OneToOne, PrimaryColumn, VersionColumn } from 'typeorm';
import { ObjectId } from 'mongoose';

@Entity()
export class User {

    // 昵称
    @Column('text')
    name: string;

    // 头像
    @Column('text')
    avatar: string;

    // @Unique('email', ['email'])
    @Column({ length: 200 })
    email: string;

    // 手机号
    @Column('text')
    phoneNumber: string;

    @Column()
    password: string;

    @Column()
    role?: ObjectId

    @Column()
    job: string;

    @Column()
    jobName: string;

    @Column()
    organization: string;

    @Column()
    organizationName: string;

    @Column()
    location: string;

    @Column()
    locationName: string;

    @Column()
    introduction: string;

    @Column()
    personalWebsite: string;

    @Column("boolean")
    verified: boolean;

    // 加密盐
    @Column({
        type: 'text',
        select: false,
    })
    salt: string;

    @Column()
    isAccountDisabled?: boolean;

    // 主键
    @ObjectIdColumn()
    _id: string

    // 创建时间
    @CreateDateColumn()
    createdAt: Date

    // 更新时间
    @UpdateDateColumn()
    updatedAt: Date

    // 软删除
    @Column({
        default: false,
        select: false,
    })
    isDelete: boolean

    // 更新次数
    @VersionColumn({
        select: false
    })
    version: number
}
