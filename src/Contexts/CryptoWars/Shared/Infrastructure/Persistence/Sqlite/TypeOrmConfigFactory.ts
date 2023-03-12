import config from '../../Config/cryptoWarsConfig';
import { TypeOrmConfig } from '../../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmConfig';

export class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return {
      database: config.get('typeorm.database'),
      migrations: config.get('typeorm.seeds'),
      entities: ['/../../../../**/**/Infrastructure/**/*Schema.ts']
    };
  }
}
