/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Army = {
  __typename?: 'Army';
  id: Scalars['ID'];
  playerId: Scalars['String'];
  squads: Squads;
  townId: Scalars['String'];
};

export type ArmyTroop = {
  __typename?: 'ArmyTroop';
  armyId: Scalars['String'];
  squads: Squads;
};

export type Attack = {
  __typename?: 'Attack';
  attackerTroop: ArmyTroop;
  defenderArmyId: Scalars['String'];
  id: Scalars['ID'];
  sentAt: Scalars['String'];
};

export type BaseError = {
  error: ErrorTypes;
  message: Scalars['String'];
  status: Scalars['Float'];
};

export type Battle = {
  __typename?: 'Battle';
  attack: Attack;
  defenderArmy: Army;
  finishedAt: Scalars['String'];
  id: Scalars['ID'];
  result: BattleResult;
};

export type BattleResult = {
  __typename?: 'BattleResult';
  attackerCasualties: Squads;
  defenderCasualties: Squads;
  returningTroop: ArmyTroop;
  winner: BattleWinner;
};

export enum BattleWinner {
  Attacker = 'attacker',
  Defender = 'defender'
}

export type Battles = {
  __typename?: 'Battles';
  battles: Array<Battle>;
};

export type ConflictError = BaseError & {
  __typename?: 'ConflictError';
  error: ErrorTypes;
  message: Scalars['String'];
  status: Scalars['Float'];
};

export type CreateUser = ConflictError | InvalidInputError | SuccessCommand;

export type CreateUserErrors = ConflictError | InvalidInputError;

export type CreateUserInput = {
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export enum ErrorTypes {
  Conflict = 'conflict',
  Forbidden = 'forbidden',
  InvalidInput = 'invalidInput',
  NotFound = 'notFound',
  Unauthorized = 'unauthorized',
  Unexpected = 'unexpected'
}

export type EssenceGenerator = TownBuilding & {
  __typename?: 'EssenceGenerator';
  asset: TownAssets;
  essenceRequiredToLevelUp: Scalars['Float'];
  generationPerHour: Scalars['Float'];
  level: Scalars['Float'];
  type: TownBuildingTypes;
};

export type FailedCreateUserResponse = {
  __typename?: 'FailedCreateUserResponse';
  errors: CreateUserErrors;
};

export type FailedJoinWorldResponse = {
  __typename?: 'FailedJoinWorldResponse';
  errors: JoinWorldErrors;
};

export type FailedLoginResponse = {
  __typename?: 'FailedLoginResponse';
  errors: LoginErrors;
};

export type FailedSendAttackResponse = {
  __typename?: 'FailedSendAttackResponse';
  errors: SendAttackErrors;
};

export type FailedTrainSoldiersResponse = {
  __typename?: 'FailedTrainSoldiersResponse';
  errors: TrainSoldiersErrors;
};

export type ForbiddenError = BaseError & {
  __typename?: 'ForbiddenError';
  error: ErrorTypes;
  message: Scalars['String'];
  status: Scalars['Float'];
};

export type Headquarter = TownBuilding & {
  __typename?: 'Headquarter';
  essenceRequiredToLevelUp: Scalars['Float'];
  level: Scalars['Float'];
  type: TownBuildingTypes;
  units: Array<TownSoldier>;
};

export type InvalidInputError = BaseError & {
  __typename?: 'InvalidInputError';
  error: ErrorTypes;
  message: Scalars['String'];
  status: Scalars['Float'];
};

export type JoinWorld = NotFoundError | SuccessCommand;

export type JoinWorldErrors = NotFoundError;

export type Login = InvalidInputError | SuccessCommand;

export type LoginErrors = InvalidInputError;

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  JoinWorld: JoinWorld;
  Login: Login;
  SendAttack: SendAttack;
  TrainSoldiers: TrainSoldiers;
  createUser: CreateUser;
};


export type MutationJoinWorldArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  login: LoginInput;
};


export type MutationSendAttackArgs = {
  input: SendAttackInput;
};


export type MutationTrainSoldiersArgs = {
  input: TrainSoldiersInput;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};

export type NotFoundError = BaseError & {
  __typename?: 'NotFoundError';
  error: ErrorTypes;
  message: Scalars['String'];
  status: Scalars['Float'];
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['ID'];
  towns: Array<Town>;
  userId: Scalars['String'];
  worlds: Array<World>;
};

export type Query = {
  __typename?: 'Query';
  GetArmy: Army;
  GetBattles: Battles;
  GetPlayer: Player;
  GetPlayerTown: Town;
  GetPlayerTowns: Towns;
  GetWorldMap: WorldMap;
  GetWorlds: Worlds;
};


export type QueryGetArmyArgs = {
  townId: Scalars['String'];
};


export type QueryGetBattlesArgs = {
  armyId: Scalars['String'];
};


export type QueryGetPlayerTownArgs = {
  id: Scalars['String'];
};


export type QueryGetWorldMapArgs = {
  id: Scalars['String'];
};

export type SendAttack = ConflictError | ForbiddenError | InvalidInputError | NotFoundError | SuccessCommand;

export type SendAttackErrors = ConflictError | ForbiddenError | InvalidInputError | NotFoundError;

export type SendAttackInput = {
  attackerArmy: Scalars['String'];
  defenderTown: Scalars['String'];
  id: Scalars['String'];
  soldiers: SquadsInput;
};

export type Squads = {
  __typename?: 'Squads';
  basic: Scalars['Float'];
  range: Scalars['Float'];
};

export type SquadsInput = {
  basic: Scalars['Float'];
  range: Scalars['Float'];
};

export type SuccessCommand = {
  __typename?: 'SuccessCommand';
  isSuccess: Scalars['Boolean'];
};

export type Town = {
  __typename?: 'Town';
  buildings: TownBuildings;
  id: Scalars['ID'];
  playerId: Scalars['String'];
  worldId: Scalars['String'];
};

export enum TownAssets {
  Essence = 'essence'
}

export type TownBuilding = {
  essenceRequiredToLevelUp: Scalars['Float'];
  level: Scalars['Float'];
  type: TownBuildingTypes;
};

export enum TownBuildingTypes {
  Creator = 'creator',
  Generator = 'generator',
  Store = 'store'
}

export type TownBuildings = {
  __typename?: 'TownBuildings';
  essenceGenerator: EssenceGenerator;
  headquarter: Headquarter;
  warehouse: Warehouse;
};

export type TownSoldier = {
  __typename?: 'TownSoldier';
  capacity: Scalars['Float'];
  cost: Scalars['Float'];
  name: TownSoldierTypes;
  speed: Scalars['Float'];
  time: Scalars['Float'];
};

export enum TownSoldierTypes {
  Basic = 'basic',
  Range = 'range'
}

export type TownSoldiers = {
  basic: Scalars['Float'];
  range: Scalars['Float'];
};

export type Towns = {
  __typename?: 'Towns';
  towns: Array<Town>;
};

export type TrainSoldiers = ForbiddenError | InvalidInputError | NotFoundError | SuccessCommand;

export type TrainSoldiersErrors = ForbiddenError | InvalidInputError | NotFoundError;

export type TrainSoldiersInput = {
  soldiers: TownSoldiers;
  townId: Scalars['String'];
};

export type Unauthorized = BaseError & {
  __typename?: 'Unauthorized';
  error: ErrorTypes;
  message: Scalars['String'];
  status: Scalars['Float'];
};

export type UnexpectedError = BaseError & {
  __typename?: 'UnexpectedError';
  error: ErrorTypes;
  message: Scalars['String'];
  status: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Warehouse = TownBuilding & {
  __typename?: 'Warehouse';
  assets: WarehouseAssets;
  essenceRequiredToLevelUp: Scalars['Float'];
  level: Scalars['Float'];
  type: TownBuildingTypes;
};

export type WarehouseAsset = {
  __typename?: 'WarehouseAsset';
  lastStorageUpdate: Scalars['String'];
  limit: Scalars['Float'];
  name: TownAssets;
  stored: Scalars['Float'];
};

export type WarehouseAssets = {
  __typename?: 'WarehouseAssets';
  essence: WarehouseAsset;
};

export type World = {
  __typename?: 'World';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type WorldMap = {
  __typename?: 'WorldMap';
  id: Scalars['ID'];
  name: Scalars['String'];
  towns: Array<WorldTown>;
};

export type WorldTown = {
  __typename?: 'WorldTown';
  id: Scalars['ID'];
  playerId: Scalars['String'];
};

export type Worlds = {
  __typename?: 'Worlds';
  worlds: Array<World>;
};

export type LoginMutationVariables = Exact<{
  login: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', Login: { __typename?: 'InvalidInputError', error: ErrorTypes, message: string, status: number } | { __typename?: 'SuccessCommand', isSuccess: boolean } };

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'ConflictError', error: ErrorTypes, message: string, status: number } | { __typename?: 'InvalidInputError', error: ErrorTypes, message: string, status: number } | { __typename?: 'SuccessCommand', isSuccess: boolean } };

export type GetArmyQueryVariables = Exact<{
  townId: Scalars['String'];
}>;


export type GetArmyQuery = { __typename?: 'Query', GetArmy: { __typename?: 'Army', id: string, playerId: string, townId: string, squads: { __typename?: 'Squads', basic: number, range: number } } };

export type ArmyBattlesQueryVariables = Exact<{
  armyId: Scalars['String'];
}>;


export type ArmyBattlesQuery = { __typename?: 'Query', GetBattles: { __typename?: 'Battles', battles: Array<{ __typename?: 'Battle', id: string, finishedAt: string, defenderArmy: { __typename?: 'Army', townId: string }, attack: { __typename?: 'Attack', sentAt: string, attackerTroop: { __typename?: 'ArmyTroop', squads: { __typename?: 'Squads', basic: number } } }, result: { __typename?: 'BattleResult', winner: BattleWinner, attackerCasualties: { __typename?: 'Squads', basic: number, range: number }, defenderCasualties: { __typename?: 'Squads', basic: number, range: number }, returningTroop: { __typename?: 'ArmyTroop', armyId: string, squads: { __typename?: 'Squads', basic: number, range: number } } } }> } };

export type PlayerTownBuildingsFragment = { __typename?: 'TownBuildings', headquarter: { __typename?: 'Headquarter', level: number, essenceRequiredToLevelUp: number }, essenceGenerator: { __typename?: 'EssenceGenerator', level: number, essenceRequiredToLevelUp: number }, warehouse: { __typename?: 'Warehouse', level: number, essenceRequiredToLevelUp: number } } & { ' $fragmentName'?: 'PlayerTownBuildingsFragment' };

export type WorldAttackMenuFragment = { __typename?: 'Town', id: string, playerId: string } & { ' $fragmentName'?: 'WorldAttackMenuFragment' };

export type WorldMapTownsChatFragmentFragment = { __typename?: 'Town', id: string, playerId: string } & { ' $fragmentName'?: 'WorldMapTownsChatFragmentFragment' };

export type HomePagePlayerQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePagePlayerQuery = { __typename?: 'Query', GetPlayer: { __typename?: 'Player', towns: Array<{ __typename?: 'Town', id: string }> } };

export type PlayerTownsQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayerTownsQuery = { __typename?: 'Query', GetPlayerTowns: { __typename?: 'Towns', towns: Array<{ __typename?: 'Town', id: string }> } };

export type PlayerTownQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PlayerTownQuery = { __typename?: 'Query', GetPlayerTown: { __typename?: 'Town', id: string, buildings: (
      { __typename?: 'TownBuildings' }
      & { ' $fragmentRefs'?: { 'PlayerTownBuildingsFragment': PlayerTownBuildingsFragment } }
    ) } };

export type PlayerTownHeaderQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PlayerTownHeaderQuery = { __typename?: 'Query', GetPlayerTown: { __typename?: 'Town', id: string, worldId: string, buildings: { __typename?: 'TownBuildings', essenceGenerator: { __typename?: 'EssenceGenerator', generationPerHour: number }, warehouse: { __typename?: 'Warehouse', assets: { __typename?: 'WarehouseAssets', essence: { __typename?: 'WarehouseAsset', stored: number, lastStorageUpdate: string } } } } } };

export type PlayerTownHeadQuarterQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PlayerTownHeadQuarterQuery = { __typename?: 'Query', GetPlayerTown: { __typename?: 'Town', id: string, buildings: { __typename?: 'TownBuildings', headquarter: { __typename?: 'Headquarter', units: Array<{ __typename?: 'TownSoldier', name: TownSoldierTypes, speed: number, capacity: number, time: number, cost: number }> } } } };

export type TrainSoldiersMutationVariables = Exact<{
  input: TrainSoldiersInput;
}>;


export type TrainSoldiersMutation = { __typename?: 'Mutation', TrainSoldiers: { __typename?: 'ForbiddenError', error: ErrorTypes, message: string, status: number } | { __typename?: 'InvalidInputError', error: ErrorTypes, message: string, status: number } | { __typename?: 'NotFoundError', error: ErrorTypes, message: string, status: number } | { __typename?: 'SuccessCommand', isSuccess: boolean } };

export type JoinWorldPageQueryVariables = Exact<{ [key: string]: never; }>;


export type JoinWorldPageQuery = { __typename?: 'Query', GetWorlds: { __typename?: 'Worlds', worlds: Array<{ __typename?: 'World', id: string, name: string }> } };

export type JoinWorldMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type JoinWorldMutation = { __typename?: 'Mutation', JoinWorld: { __typename?: 'NotFoundError', error: ErrorTypes, message: string, status: number } | { __typename?: 'SuccessCommand', isSuccess: boolean } };

export type WorldMapQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type WorldMapQuery = { __typename?: 'Query', GetWorldMap: { __typename?: 'WorldMap', id: string, name: string, towns: Array<{ __typename?: 'WorldTown', id: string, playerId: string }> } };

export type SendAttackMutationVariables = Exact<{
  input: SendAttackInput;
}>;


export type SendAttackMutation = { __typename?: 'Mutation', SendAttack: { __typename?: 'ConflictError', error: ErrorTypes, message: string, status: number } | { __typename?: 'ForbiddenError', error: ErrorTypes, message: string, status: number } | { __typename?: 'InvalidInputError', error: ErrorTypes, message: string, status: number } | { __typename?: 'NotFoundError', error: ErrorTypes, message: string, status: number } | { __typename?: 'SuccessCommand', isSuccess: boolean } };

export type BattlesQueryVariables = Exact<{
  armyId: Scalars['String'];
}>;


export type BattlesQuery = { __typename?: 'Query', GetBattles: { __typename?: 'Battles', battles: Array<{ __typename?: 'Battle', id: string, finishedAt: string, attack: { __typename?: 'Attack', id: string, defenderArmyId: string, sentAt: string, attackerTroop: { __typename?: 'ArmyTroop', armyId: string } }, defenderArmy: { __typename?: 'Army', id: string, playerId: string, townId: string, squads: { __typename?: 'Squads', basic: number, range: number } }, result: { __typename?: 'BattleResult', winner: BattleWinner, attackerCasualties: { __typename?: 'Squads', basic: number, range: number }, defenderCasualties: { __typename?: 'Squads', basic: number, range: number }, returningTroop: { __typename?: 'ArmyTroop', armyId: string } } }> } };

export type GetWorldMapQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetWorldMapQuery = { __typename?: 'Query', GetWorldMap: { __typename?: 'WorldMap', id: string, name: string, towns: Array<{ __typename?: 'WorldTown', id: string, playerId: string }> } };

export type GetWorldsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorldsQuery = { __typename?: 'Query', GetWorlds: { __typename?: 'Worlds', worlds: Array<{ __typename?: 'World', id: string, name: string }> } };

export type GetPlayerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlayerQuery = { __typename?: 'Query', GetPlayer: { __typename?: 'Player', id: string, userId: string, towns: Array<{ __typename?: 'Town', id: string, playerId: string, worldId: string, buildings: { __typename?: 'TownBuildings', headquarter: { __typename?: 'Headquarter', level: number, essenceRequiredToLevelUp: number, type: TownBuildingTypes, units: Array<{ __typename?: 'TownSoldier', name: TownSoldierTypes, speed: number, capacity: number, time: number, cost: number }> }, essenceGenerator: { __typename?: 'EssenceGenerator', level: number, essenceRequiredToLevelUp: number, type: TownBuildingTypes, asset: TownAssets, generationPerHour: number }, warehouse: { __typename?: 'Warehouse', level: number, essenceRequiredToLevelUp: number, type: TownBuildingTypes, assets: { __typename?: 'WarehouseAssets', essence: { __typename?: 'WarehouseAsset', name: TownAssets, limit: number, stored: number, lastStorageUpdate: string } } } } }>, worlds: Array<{ __typename?: 'World', id: string, name: string }> } };

export type TrainSoldiersTestMutationVariables = Exact<{
  input: TrainSoldiersInput;
}>;


export type TrainSoldiersTestMutation = { __typename?: 'Mutation', TrainSoldiers: { __typename?: 'ForbiddenError', error: ErrorTypes, message: string, status: number } | { __typename?: 'InvalidInputError', error: ErrorTypes, message: string, status: number } | { __typename?: 'NotFoundError', error: ErrorTypes, message: string, status: number } | { __typename?: 'SuccessCommand', isSuccess: boolean } };

export const PlayerTownBuildingsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlayerTownBuildings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TownBuildings"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"headquarter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"essenceRequiredToLevelUp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"essenceGenerator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"essenceRequiredToLevelUp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"essenceRequiredToLevelUp"}}]}}]}}]} as unknown as DocumentNode<PlayerTownBuildingsFragment, unknown>;
export const WorldAttackMenuFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorldAttackMenu"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Town"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playerId"}}]}}]} as unknown as DocumentNode<WorldAttackMenuFragment, unknown>;
export const WorldMapTownsChatFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorldMapTownsChatFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Town"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playerId"}}]}}]} as unknown as DocumentNode<WorldMapTownsChatFragmentFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"login"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SuccessCommand"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSuccess"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SuccessCommand"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSuccess"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const GetArmyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetArmy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"townId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetArmy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"townId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"townId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playerId"}},{"kind":"Field","name":{"kind":"Name","value":"townId"}},{"kind":"Field","name":{"kind":"Name","value":"squads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basic"}},{"kind":"Field","name":{"kind":"Name","value":"range"}}]}}]}}]}}]} as unknown as DocumentNode<GetArmyQuery, GetArmyQueryVariables>;
export const ArmyBattlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArmyBattles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"armyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetBattles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"armyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"armyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"battles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"defenderArmy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"townId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attack"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sentAt"}},{"kind":"Field","name":{"kind":"Name","value":"attackerTroop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"squads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basic"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"winner"}},{"kind":"Field","name":{"kind":"Name","value":"attackerCasualties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basic"}},{"kind":"Field","name":{"kind":"Name","value":"range"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defenderCasualties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basic"}},{"kind":"Field","name":{"kind":"Name","value":"range"}}]}},{"kind":"Field","name":{"kind":"Name","value":"returningTroop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"armyId"}},{"kind":"Field","name":{"kind":"Name","value":"squads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basic"}},{"kind":"Field","name":{"kind":"Name","value":"range"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ArmyBattlesQuery, ArmyBattlesQueryVariables>;
export const HomePagePlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePagePlayer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetPlayer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"towns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<HomePagePlayerQuery, HomePagePlayerQueryVariables>;
export const PlayerTownsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlayerTowns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetPlayerTowns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"towns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<PlayerTownsQuery, PlayerTownsQueryVariables>;
export const PlayerTownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlayerTown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetPlayerTown"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlayerTownBuildings"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlayerTownBuildings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TownBuildings"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"headquarter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"essenceRequiredToLevelUp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"essenceGenerator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"essenceRequiredToLevelUp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"essenceRequiredToLevelUp"}}]}}]}}]} as unknown as DocumentNode<PlayerTownQuery, PlayerTownQueryVariables>;
export const PlayerTownHeaderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlayerTownHeader"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetPlayerTown"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"essenceGenerator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generationPerHour"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"essence"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stored"}},{"kind":"Field","name":{"kind":"Name","value":"lastStorageUpdate"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"worldId"}}]}}]}}]} as unknown as DocumentNode<PlayerTownHeaderQuery, PlayerTownHeaderQueryVariables>;
export const PlayerTownHeadQuarterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlayerTownHeadQuarter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetPlayerTown"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"headquarter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"units"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PlayerTownHeadQuarterQuery, PlayerTownHeadQuarterQueryVariables>;
export const TrainSoldiersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TrainSoldiers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrainSoldiersInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"TrainSoldiers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SuccessCommand"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSuccess"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<TrainSoldiersMutation, TrainSoldiersMutationVariables>;
export const JoinWorldPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JoinWorldPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetWorlds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"worlds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<JoinWorldPageQuery, JoinWorldPageQueryVariables>;
export const JoinWorldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinWorld"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"JoinWorld"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SuccessCommand"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSuccess"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<JoinWorldMutation, JoinWorldMutationVariables>;
export const WorldMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorldMap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetWorldMap"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"towns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playerId"}}]}}]}}]}}]} as unknown as DocumentNode<WorldMapQuery, WorldMapQueryVariables>;
export const SendAttackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendAttack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendAttackInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SendAttack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SuccessCommand"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSuccess"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<SendAttackMutation, SendAttackMutationVariables>;
export const BattlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Battles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"armyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetBattles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"armyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"armyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"battles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attack"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attackerTroop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"armyId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defenderArmyId"}},{"kind":"Field","name":{"kind":"Name","value":"sentAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defenderArmy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playerId"}},{"kind":"Field","name":{"kind":"Name","value":"townId"}},{"kind":"Field","name":{"kind":"Name","value":"squads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basic"}},{"kind":"Field","name":{"kind":"Name","value":"range"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"winner"}},{"kind":"Field","name":{"kind":"Name","value":"attackerCasualties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basic"}},{"kind":"Field","name":{"kind":"Name","value":"range"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defenderCasualties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basic"}},{"kind":"Field","name":{"kind":"Name","value":"range"}}]}},{"kind":"Field","name":{"kind":"Name","value":"returningTroop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"armyId"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<BattlesQuery, BattlesQueryVariables>;
export const GetWorldMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorldMap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetWorldMap"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"towns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playerId"}}]}}]}}]}}]} as unknown as DocumentNode<GetWorldMapQuery, GetWorldMapQueryVariables>;
export const GetWorldsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorlds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetWorlds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"worlds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetWorldsQuery, GetWorldsQueryVariables>;
export const GetPlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlayer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetPlayer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"towns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playerId"}},{"kind":"Field","name":{"kind":"Name","value":"worldId"}},{"kind":"Field","name":{"kind":"Name","value":"buildings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"headquarter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"essenceRequiredToLevelUp"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"units"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"essenceGenerator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"essenceRequiredToLevelUp"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"asset"}},{"kind":"Field","name":{"kind":"Name","value":"generationPerHour"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"essenceRequiredToLevelUp"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"essence"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"stored"}},{"kind":"Field","name":{"kind":"Name","value":"lastStorageUpdate"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"worlds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetPlayerQuery, GetPlayerQueryVariables>;
export const TrainSoldiersTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TrainSoldiersTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrainSoldiersInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"TrainSoldiers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SuccessCommand"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSuccess"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidInputError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ForbiddenError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<TrainSoldiersTestMutation, TrainSoldiersTestMutationVariables>;