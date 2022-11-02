import config from '../../Config/cryptoWarsConfig';
import { TypeOrmConfig } from '../../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmConfig';

export class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return {
      database: config.get('typeorm.database'),
      migrations: config.get('typeorm.seeds')
    };
  }
}

//todo: remove data migrations
//todo: add endpoint to create worlds, this endpoint will be a command line
//todo: clean up the database on each run
