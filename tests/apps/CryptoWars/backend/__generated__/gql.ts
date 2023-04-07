/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Login($login: LoginInput!) {\n    Login(login: $login) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on BaseError {\n        error\n        message\n        status\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on BaseError {\n        error\n        message\n        status\n      }\n    }\n  }\n": types.CreateUserDocument,
    "\n  query GetArmy($townId: String!) {\n    GetArmy(townId: $townId) {\n      id\n      playerId\n      townId\n      squads {\n        basic\n        range\n      }\n    }\n  }\n": types.GetArmyDocument,
    "\n  fragment PlayerTownBuildings on TownBuildings {\n    headquarter {\n      level\n      essenceRequiredToLevelUp\n    }\n    essenceGenerator {\n      level\n      essenceRequiredToLevelUp\n    }\n    warehouse {\n      level\n      essenceRequiredToLevelUp\n    }\n  }\n": types.PlayerTownBuildingsFragmentDoc,
    "\n  query HomePagePlayer {\n    GetPlayer {\n      towns {\n        id\n      }\n    }\n  }\n": types.HomePagePlayerDocument,
    "\n  query PlayerTowns {\n    GetPlayerTowns {\n        towns {\n          id\n        }\n    }\n  }\n": types.PlayerTownsDocument,
    "\n    query PlayerTown($id: String!) {\n      GetPlayerTown(id: $id) {  \n        id \n        buildings {\n          ...PlayerTownBuildings\n        }\n    }\n  }\n": types.PlayerTownDocument,
    "\n  query PlayerTownHeader($id: String!) {\n    GetPlayerTown(id: $id) {  \n      id\n      buildings {\n        essenceGenerator {\n          generationPerHour\n        }\n        warehouse {\n          assets {\n            essence {\n                stored\n                lastStorageUpdate\n            }\n          }\n        }\n      }\n      worldId\n    }\n  }\n": types.PlayerTownHeaderDocument,
    "\n  query JoinWorldPage {\n    GetWorlds {\n      worlds {\n        id\n        name\n      }\n    }\n  }\n": types.JoinWorldPageDocument,
    "\n  mutation JoinWorld($id: String!) {\n    JoinWorld(id: $id) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on BaseError {\n        error\n        message\n        status\n      }\n    }\n  }\n": types.JoinWorldDocument,
    "\n  query WorldMap($id: String!) {\n    GetWorldMap(id: $id) {\n      id\n      name\n      towns {\n        id\n        playerId\n      }\n    }\n  }\n": types.WorldMapDocument,
    "\n  mutation SendAttack($input: SendAttackInput!) {\n    SendAttack(input: $input) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on BaseError {\n        error\n        message\n        status\n      }\n    }\n  }\n": types.SendAttackDocument,
    "\n  query Battles($armyId: String!) {\n    GetBattles(armyId: $armyId) {\n      battles {\n        id\n        attack {\n          id\n          attackerTroop {\n            armyId\n          }\n          defenderArmyId\n          sentAt\n        }\n        defenderArmy {\n          id\n          playerId\n          townId\n          squads {\n            basic\n            range\n          }\n        }\n        finishedAt\n        result {\n          winner\n          attackerCasualties {\n            basic\n            range\n          }\n          defenderCasualties {\n            basic\n            range\n          }\n          returningTroop {\n            armyId\n          }\n        }\n      }\n    }\n  }\n": types.BattlesDocument,
    "\n  query GetWorldMap($id: String!) {\n    GetWorldMap(id: $id) {\n      id\n      name\n      towns {\n        id\n        playerId\n      }\n    }\n  }\n": types.GetWorldMapDocument,
    "\n  query GetWorlds {\n    GetWorlds {\n      worlds {\n        id\n        name\n      }\n    }\n  }\n": types.GetWorldsDocument,
    "\n  query GetPlayer {\n    GetPlayer {\n        id\n        userId\n        towns {\n          id\n          playerId\n          worldId\n          buildings {\n            headquarter {\n              level\n              essenceRequiredToLevelUp\n              type\n              units {\n                name\n                speed\n                capacity\n                time\n                cost\n              }\n            }\n            essenceGenerator {\n              level\n              essenceRequiredToLevelUp\n              type\n              asset\n              generationPerHour\n            }\n            warehouse {\n              level\n              essenceRequiredToLevelUp\n              type\n              assets {\n                essence {\n                  name\n                  limit\n                  stored\n                  lastStorageUpdate\n                }\n              }\n            }\n          }\n        }\n        worlds {\n          id\n          name\n        }\n    }\n  }\n": types.GetPlayerDocument,
    "\n  mutation TrainSoldiers($input: TrainSoldiersInput!) {\n    TrainSoldiers(input: $input) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on InvalidInputError {\n        error\n        message\n        status\n      }\n      ... on ForbiddenError {\n        error\n        message\n        status\n      }\n      ... on NotFoundError {\n        error\n        message\n        status\n      }\n    }\n  }\n": types.TrainSoldiersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($login: LoginInput!) {\n    Login(login: $login) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on BaseError {\n        error\n        message\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($login: LoginInput!) {\n    Login(login: $login) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on BaseError {\n        error\n        message\n        status\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on BaseError {\n        error\n        message\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on BaseError {\n        error\n        message\n        status\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetArmy($townId: String!) {\n    GetArmy(townId: $townId) {\n      id\n      playerId\n      townId\n      squads {\n        basic\n        range\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetArmy($townId: String!) {\n    GetArmy(townId: $townId) {\n      id\n      playerId\n      townId\n      squads {\n        basic\n        range\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PlayerTownBuildings on TownBuildings {\n    headquarter {\n      level\n      essenceRequiredToLevelUp\n    }\n    essenceGenerator {\n      level\n      essenceRequiredToLevelUp\n    }\n    warehouse {\n      level\n      essenceRequiredToLevelUp\n    }\n  }\n"): (typeof documents)["\n  fragment PlayerTownBuildings on TownBuildings {\n    headquarter {\n      level\n      essenceRequiredToLevelUp\n    }\n    essenceGenerator {\n      level\n      essenceRequiredToLevelUp\n    }\n    warehouse {\n      level\n      essenceRequiredToLevelUp\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query HomePagePlayer {\n    GetPlayer {\n      towns {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query HomePagePlayer {\n    GetPlayer {\n      towns {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PlayerTowns {\n    GetPlayerTowns {\n        towns {\n          id\n        }\n    }\n  }\n"): (typeof documents)["\n  query PlayerTowns {\n    GetPlayerTowns {\n        towns {\n          id\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query PlayerTown($id: String!) {\n      GetPlayerTown(id: $id) {  \n        id \n        buildings {\n          ...PlayerTownBuildings\n        }\n    }\n  }\n"): (typeof documents)["\n    query PlayerTown($id: String!) {\n      GetPlayerTown(id: $id) {  \n        id \n        buildings {\n          ...PlayerTownBuildings\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PlayerTownHeader($id: String!) {\n    GetPlayerTown(id: $id) {  \n      id\n      buildings {\n        essenceGenerator {\n          generationPerHour\n        }\n        warehouse {\n          assets {\n            essence {\n                stored\n                lastStorageUpdate\n            }\n          }\n        }\n      }\n      worldId\n    }\n  }\n"): (typeof documents)["\n  query PlayerTownHeader($id: String!) {\n    GetPlayerTown(id: $id) {  \n      id\n      buildings {\n        essenceGenerator {\n          generationPerHour\n        }\n        warehouse {\n          assets {\n            essence {\n                stored\n                lastStorageUpdate\n            }\n          }\n        }\n      }\n      worldId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query JoinWorldPage {\n    GetWorlds {\n      worlds {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query JoinWorldPage {\n    GetWorlds {\n      worlds {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation JoinWorld($id: String!) {\n    JoinWorld(id: $id) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on BaseError {\n        error\n        message\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation JoinWorld($id: String!) {\n    JoinWorld(id: $id) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on BaseError {\n        error\n        message\n        status\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query WorldMap($id: String!) {\n    GetWorldMap(id: $id) {\n      id\n      name\n      towns {\n        id\n        playerId\n      }\n    }\n  }\n"): (typeof documents)["\n  query WorldMap($id: String!) {\n    GetWorldMap(id: $id) {\n      id\n      name\n      towns {\n        id\n        playerId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendAttack($input: SendAttackInput!) {\n    SendAttack(input: $input) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on BaseError {\n        error\n        message\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SendAttack($input: SendAttackInput!) {\n    SendAttack(input: $input) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on BaseError {\n        error\n        message\n        status\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Battles($armyId: String!) {\n    GetBattles(armyId: $armyId) {\n      battles {\n        id\n        attack {\n          id\n          attackerTroop {\n            armyId\n          }\n          defenderArmyId\n          sentAt\n        }\n        defenderArmy {\n          id\n          playerId\n          townId\n          squads {\n            basic\n            range\n          }\n        }\n        finishedAt\n        result {\n          winner\n          attackerCasualties {\n            basic\n            range\n          }\n          defenderCasualties {\n            basic\n            range\n          }\n          returningTroop {\n            armyId\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Battles($armyId: String!) {\n    GetBattles(armyId: $armyId) {\n      battles {\n        id\n        attack {\n          id\n          attackerTroop {\n            armyId\n          }\n          defenderArmyId\n          sentAt\n        }\n        defenderArmy {\n          id\n          playerId\n          townId\n          squads {\n            basic\n            range\n          }\n        }\n        finishedAt\n        result {\n          winner\n          attackerCasualties {\n            basic\n            range\n          }\n          defenderCasualties {\n            basic\n            range\n          }\n          returningTroop {\n            armyId\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetWorldMap($id: String!) {\n    GetWorldMap(id: $id) {\n      id\n      name\n      towns {\n        id\n        playerId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWorldMap($id: String!) {\n    GetWorldMap(id: $id) {\n      id\n      name\n      towns {\n        id\n        playerId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetWorlds {\n    GetWorlds {\n      worlds {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWorlds {\n    GetWorlds {\n      worlds {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPlayer {\n    GetPlayer {\n        id\n        userId\n        towns {\n          id\n          playerId\n          worldId\n          buildings {\n            headquarter {\n              level\n              essenceRequiredToLevelUp\n              type\n              units {\n                name\n                speed\n                capacity\n                time\n                cost\n              }\n            }\n            essenceGenerator {\n              level\n              essenceRequiredToLevelUp\n              type\n              asset\n              generationPerHour\n            }\n            warehouse {\n              level\n              essenceRequiredToLevelUp\n              type\n              assets {\n                essence {\n                  name\n                  limit\n                  stored\n                  lastStorageUpdate\n                }\n              }\n            }\n          }\n        }\n        worlds {\n          id\n          name\n        }\n    }\n  }\n"): (typeof documents)["\n  query GetPlayer {\n    GetPlayer {\n        id\n        userId\n        towns {\n          id\n          playerId\n          worldId\n          buildings {\n            headquarter {\n              level\n              essenceRequiredToLevelUp\n              type\n              units {\n                name\n                speed\n                capacity\n                time\n                cost\n              }\n            }\n            essenceGenerator {\n              level\n              essenceRequiredToLevelUp\n              type\n              asset\n              generationPerHour\n            }\n            warehouse {\n              level\n              essenceRequiredToLevelUp\n              type\n              assets {\n                essence {\n                  name\n                  limit\n                  stored\n                  lastStorageUpdate\n                }\n              }\n            }\n          }\n        }\n        worlds {\n          id\n          name\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation TrainSoldiers($input: TrainSoldiersInput!) {\n    TrainSoldiers(input: $input) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on InvalidInputError {\n        error\n        message\n        status\n      }\n      ... on ForbiddenError {\n        error\n        message\n        status\n      }\n      ... on NotFoundError {\n        error\n        message\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation TrainSoldiers($input: TrainSoldiersInput!) {\n    TrainSoldiers(input: $input) {\n      ... on SuccessCommand {\n        isSuccess\n      }\n      ... on InvalidInputError {\n        error\n        message\n        status\n      }\n      ... on ForbiddenError {\n        error\n        message\n        status\n      }\n      ... on NotFoundError {\n        error\n        message\n        status\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;