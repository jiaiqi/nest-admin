import { User } from "./entities/user.mongo.entity";

export const UserProviders = [
    {
        provide: "USER_REPOSITORY",
        useFactory: async (appDataSource) => await appDataSource.getRepository(User),
        inject: ['MONGODB_DATA_SOURCE']
    }
]