import { TypeOrmConfig } from '../../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmConfig';

export class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return {
      database: 'diod-database',
      migrations: 'src/Contexts/CryptoWars/Shared/Infrastructure/Persistence/Migrations/*{.ts,.js}',
      entities: '/../../../../**/**/infrastructure/Persistence/typeorm/*{.js,.ts}'
    };
  }
}
