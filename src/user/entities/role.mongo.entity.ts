import { Common } from "@/shared/entities/common.entity";
import { Column, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity()
export class Role extends Common {
    // 角色名
    @Column({
        type: 'text',
        unique: true
    })
    name: string

    // 权限
    @Column('')
    permissions: object
}