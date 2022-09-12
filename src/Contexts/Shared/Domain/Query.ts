import { Either } from '../Aplication/Result';

export abstract class Query {}
export type QueryResult<Result, Errors> = Either<Result, Errors>;
