import { PaginationParamsDto } from "@/shared/dtos/pagination-params.dto";
import { Inject, Injectable } from "@nestjs/common";
import { MongoRepository } from "typeorm";
import { Role } from "../entities/role.mongo.entity";


@Injectable()
export class RoleService {
    constructor(
        @Inject("ROLE_REPOSITORY")
        private RoleRepository: MongoRepository<Role>
    ) { }

    create(Role) {
        return this.RoleRepository.save(Role)
    }

    async findAll({ current, size }: PaginationParamsDto): Promise<{ data: Role[]; count: number }> {
        const [data, count] = await this.RoleRepository.findAndCount({
            order: { createAt: 'DESC' },
            skip: (current - 1) * size,
            take: size * 1,
            cache: true
        })

        return {
            data,
            count
        }
    }

    async findOne(id: string) {
        return await this.RoleRepository.findOneBy(id)
    }

    async update(id: string, Role) {
        // 去除时间戳和id
        ['_id', 'createdAt', 'updatedAt'].forEach(
            k => delete Role[k]
        )
        // 更新时间戳
        // course.updatedAt = new Date()
        return await this.RoleRepository.update(id, Role)
    }

    async remove(id: string): Promise<any> {
        return await this.RoleRepository.delete(id)
    }
}