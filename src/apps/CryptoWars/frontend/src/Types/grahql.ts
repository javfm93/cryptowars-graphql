export type PickOperationUnionMember<
  Operation extends { __typename?: string },
  Typename extends Operation['__typename']
> = Operation extends { __typename?: Typename } ? Operation : never;
