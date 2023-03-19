import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configModuleOptions } from "./configs/module-options";
import { DatabaseProviders } from "./database.providers";
import { AppLoggerModule } from "./logger/logger.module";
import { SystemService } from "./system.service";

@Module({
    providers: [
        SystemService,
        ConfigModule,
        AppLoggerModule,
        ...DatabaseProviders],
    exports: [SystemService, ...DatabaseProviders],
    imports: [
        ConfigModule.forRoot(configModuleOptions),
        AppLoggerModule
    ]
})

export class SharedModule {
}