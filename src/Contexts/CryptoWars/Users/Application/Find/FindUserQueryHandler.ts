import { FindUserQuery } from './FindUserQuery';
import { FindUser } from './FindUser';
import { Either } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { User } from '../../Domain/User';
import { DomainError } from '../../Domain/Errors/DomainError';
import { UserId } from '../../Domain/UserId';

export type FindUserQueryResult = Either<User, DomainError>;

export class FindUserQueryHandler implements QueryHandler<FindUserQuery, FindUserQueryResult> {
  constructor(private findUser: FindUser) {}

  subscribedTo(): Query {
    return FindUserQuery;
  }

  async handle(query: FindUserQuery): Promise<FindUserQueryResult> {
    const userId = UserId.create(query.id);
    return this.findUser.execute(userId);
  }
}
