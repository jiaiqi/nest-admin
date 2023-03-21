// import { User } from "@/user/entities/user.mongo.entity";
// import { User } from "@/user/entities/user.mongo.entity";
import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

const path = require('path')

const databaseType: DataSourceOptions['type'] = 'mongodb'
export const DatabaseProvider = [
    {
        provide: 'MONGODB_DATA_SOURCE',
        //数据源 url、用户名、密码
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {

            const config = {
                type: databaseType,
                url: configService.get<string>('database.url'),
                username: configService.get<string>('database.user'),
                password: configService.get<string>('database.pass'),
                database: configService.get<string>('database.name'),
                logging: configService.get<boolean>('database.logging'),
                synchronize: configService.get<boolean>('database.synchronize'),
                entities: [
                    path.join(__dirname, '../../**/entities/*.mongo.entity{.ts,.js}'),
                ]
            }

            const dataSource = new DataSource(config)
            console.log('config:\n', config);

            await dataSource.initialize()

            return dataSource
        }
    }
]