import { Result } from '../Aplication/Result';

export abstract class Query {}
export type QueryResult<R, Errors> = Result<R, Errors>;
