import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from 'typeorm'
import * as path from 'path'

const databaseType: DataSourceOptions['type'] = 'mongodb'
export const DatabaseProviders = [
    {
        provide: 'MONGODB_DATA_SOURCE',
        inject: [ConfigService], //url,用户名,密码
        useFactory: async (ConfigService: ConfigService) => {
            const config = {
                type: databaseType,
                url: ConfigService.get<string>('database.url'),
                username: ConfigService.get<string>('database.username'),
                database: ConfigService.get<string>('database.name'),
                entities: [
                    path.join(__dirname, `../../**/*.mongo.entity{.ts,.js}`)
                ],
                logging: ConfigService.get<boolean>('database.logging'),
                synchronize: ConfigService.get<boolean>('database.synchronize'),

            }
            const ds = new DataSource(config)
            await ds.initialize()
            return ds
        }
    }
]