import { FindUserQuery } from './FindUserQuery';
import { FindUser } from './FindUser';
import { Result } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { BaseQueryHandler } from '../../../../Shared/Domain/BaseQueryHandler';
import { User } from '../../Domain/User';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { UserId } from '../../Domain/UserId';

export type FindUserQueryResult = Result<User, DomainError>;

export class FindUserQueryHandler implements BaseQueryHandler<FindUserQuery, FindUserQueryResult> {
  constructor(private findUser: FindUser) {}

  subscribedTo(): Query {
    return FindUserQuery;
  }

  async handle(query: FindUserQuery): Promise<FindUserQueryResult> {
    const userId = UserId.create(query.id);
    return this.findUser.execute(userId);
  }
}
