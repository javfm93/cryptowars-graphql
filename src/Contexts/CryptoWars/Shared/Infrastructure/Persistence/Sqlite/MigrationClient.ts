import { TypeOrmClientFactory } from '../../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmClientFactory';
import { TypeOrmConfigFactory } from './TypeOrmConfigFactory';

export default TypeOrmClientFactory.createMigrationClient(
  'Shared',
  TypeOrmConfigFactory.createConfig()
);
