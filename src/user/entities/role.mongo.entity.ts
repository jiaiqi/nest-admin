import { Common } from "@/shared/entities/common.entity";
import { Column } from "typeorm";

export class Role extends Common {
    // 角色名
    @Column('text')
    name: string

    // 权限
    @Column('')
    permissions: object
}