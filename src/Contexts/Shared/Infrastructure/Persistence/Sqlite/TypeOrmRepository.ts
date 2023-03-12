import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { Service } from 'diod';
import { AbstractClass, Class } from '../../../Domain/Primitives';
import {
  ComponentTags,
  DependencyInjector
} from '../../../../../apps/CryptoWars/backend/dependency-injection/dependencyInjector';

console.log('+++++++++++++ typeormreposotory +++++++');
@Service()
export abstract class TypeOrmRepository<T extends ObjectLiteral> {
  constructor(private _client: DataSource) {}

  protected abstract entitySchema(): EntityTarget<T>;

  protected client(): DataSource {
    return this._client;
  }

  protected async repository(): Promise<Repository<T>> {
    return this._client.getRepository(this.entitySchema());
  }

  protected async executeTransaction(
    transaction: (repository: Repository<T>) => Promise<void>
  ): Promise<void> {
    const client = await this.client();
    await client.transaction(async (transactionalEntityManager: any) => {
      const repository = transactionalEntityManager.getRepository(this.entitySchema());
      await transaction(repository);
    });
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository();
    await repository.save(aggregateRoot);
  }
}

export const RegisterRepository = (repository: AbstractClass<any>) => {
  return (target: Class<any>): Class<any> => {
    DependencyInjector.register(repository).use(target).addTag(ComponentTags.repository);
    return target;
  };
};
