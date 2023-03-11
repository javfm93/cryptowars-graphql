import { DataSource } from 'typeorm';
import { TypeOrmConfig } from './TypeOrmConfig';

export class TypeOrmClientFactory {
  static createClient(contextName: string, config: TypeOrmConfig): DataSource {
    try {
      return this.createMigrationClient(contextName, config);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static createMigrationClient(contextName: string, config: TypeOrmConfig): DataSource {
    try {
      const dataSource = new DataSource({
        name: contextName,
        type: 'sqlite',
        database: config.database,
        entities: [__dirname + config.entities],
        synchronize: true,
        logging: false,
        migrations: [config.migrations],
        migrationsRun: true
      });
      return dataSource;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
