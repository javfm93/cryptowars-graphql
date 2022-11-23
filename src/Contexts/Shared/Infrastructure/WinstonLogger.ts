import winston, { Logger as WinstonLoggerType } from 'winston';
import Logger from '../Domain/Logger';
import ecsFormat from '@elastic/ecs-winston-format';

enum Levels {
  DEBUG = 'debug',
  ERROR = 'error',
  INFO = 'info'
}

const sampleOneTenth = (cb: () => void) => {
  const random1ToT10 = Math.floor(Math.random() * 10) + 1;
  if (random1ToT10 > 9) {
    cb();
  }
};

const getLogLocation = (): string | undefined =>
  new Error().stack?.split('at ')[3].split('file:')[1];

class WinstonLogger implements Logger {
  private logger: WinstonLoggerType;

  constructor() {
    this.logger = winston.createLogger({
      format: ecsFormat({ convertReqRes: true }),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.prettyPrint(),
            winston.format.errors({ stack: true }),
            winston.format.splat(),
            winston.format.colorize(),
            winston.format.simple()
          )
        }),
        new winston.transports.File({ filename: `logs/${Levels.DEBUG}.log`, level: Levels.DEBUG }),
        new winston.transports.File({ filename: `logs/${Levels.ERROR}.log`, level: Levels.ERROR }),
        new winston.transports.File({ filename: `logs/${Levels.INFO}.log`, level: Levels.INFO })
      ]
    });
  }

  debug(message?: string) {
    this.logger.debug(message);
    this.logger.debug(`at (${getLogLocation()}`);
  }

  error(message?: string | Error) {
    this.logger.error(message);
  }

  info(message?: string) {
    this.logger.info(message);
    this.logger.debug(`at (${getLogLocation()}`);
  }

  sampledOneTenthInfo(message?: string) {
    const logLocation = getLogLocation();

    sampleOneTenth(() => {
      this.logger.info(message);
      this.logger.debug(`at (${logLocation}`);
    });
  }
}

export default WinstonLogger;
export const logger = new WinstonLogger();
