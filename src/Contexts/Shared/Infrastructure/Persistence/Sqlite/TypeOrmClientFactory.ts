import { DataSource } from 'typeorm';
import { TypeOrmConfig } from './TypeOrmConfig';

export class TypeOrmClientFactory {
  static createClient(contextName: string, config: TypeOrmConfig): Promise<DataSource> {
    try {
      const client = this.createMigrationClient(contextName, config);
      return client.initialize();
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
