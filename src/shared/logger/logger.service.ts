import { createLogger, format, Logger, transports } from "winston";

export class AppLogger {
    private context?: string;
    private logger: Logger;

    public setContext(context: string): void {
        this.context = context
    }

    constructor() {
        this.logger = createLogger({
            level: process.env.LOGGER_LEVEL,// 分级
            format: format.combine(
                format.timestamp(),
                format.prettyPrint()
            ),
            transports: [
                new transports.File({
                    filename: 'logs/error.log',
                    level: "error"
                }),
                new transports.File({
                    filename: 'logs/info.log',
                    level: "info"
                }),
                new transports.Console()
            ]
        })
    }

    // 具体日志方法实现
    error(ctx: any,
        message: string,
        meta?: Record<string, any>
    ): Logger {
        return this.logger.error({
            message,
            contextName: this.context,
            ctx,
            ...meta
        })
    }

    warn(ctx: any,
        message: string,
        meta?: Record<string, any>
    ): Logger {
        return this.logger.warn({
            message,
            contextName: this.context,
            ctx,
            ...meta
        })
    }

    debug(ctx: any,
        message: string,
        meta?: Record<string, any>
    ): Logger {
        return this.logger.debug({
            message,
            contextName: this.context,
            ctx,
            ...meta
        })
    }

    info(ctx: any,
        message: string,
        meta?: Record<string, any>
    ): Logger {
        return this.logger.info({
            message,
            contextName: this.context,
            ctx,
            ...meta
        })
    }
}