import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialTables1667319142659 implements MigrationInterface {
  name = 'InitialTables1667319142659';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "players"
                             (
                               "id"     varchar PRIMARY KEY NOT NULL,
                               "userId" varchar             NOT NULL,
                               CONSTRAINT "UQ_7c11c744c0601ab432cfa6ff7ad" UNIQUE ("userId")
                             )`);
    await queryRunner.query(`CREATE TABLE "towns"
                             (
                               "id"        varchar PRIMARY KEY NOT NULL,
                               "playerId"  varchar,
                               "worldId"   varchar,
                               "buildings" text                NOT NULL
                             )`);
    await queryRunner.query(`CREATE TABLE "users"
                             (
                               "id"       varchar PRIMARY KEY NOT NULL,
                               "email"    varchar             NOT NULL,
                               "password" varchar             NOT NULL,
                               CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
                             )`);
    await queryRunner.query(`CREATE TABLE "worlds"
                             (
                               "id"   varchar PRIMARY KEY NOT NULL,
                               "name" varchar             NOT NULL,
                               CONSTRAINT "UQ_d1fdc53bc57d911dfeaa465a860" UNIQUE ("name")
                             )`);
    await queryRunner.query(`CREATE TABLE "players_worlds_worlds"
                             (
                               "playersId" varchar NOT NULL,
                               "worldsId"  varchar NOT NULL,
                               PRIMARY KEY ("playersId", "worldsId")
                             )`);
    await queryRunner.query(
      `CREATE INDEX "IDX_b165f004f35895ecf654bcbd28" ON "players_worlds_worlds" ("playersId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dceaf4ed735efd62b1ab241cb5" ON "players_worlds_worlds" ("worldsId") `
    );
    await queryRunner.query(`CREATE TABLE "worlds_players_players"
                             (
                               "worldsId"  varchar NOT NULL,
                               "playersId" varchar NOT NULL,
                               PRIMARY KEY ("worldsId", "playersId")
                             )`);
    await queryRunner.query(
      `CREATE INDEX "IDX_d625f9da5a0963d705336988e4" ON "worlds_players_players" ("worldsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b0f97e37b0625ded66ac23ae75" ON "worlds_players_players" ("playersId") `
    );
    await queryRunner.query(`CREATE TABLE "worlds_towns_towns"
                             (
                               "worldsId" varchar NOT NULL,
                               "townsId"  varchar NOT NULL,
                               PRIMARY KEY ("worldsId", "townsId")
                             )`);
    await queryRunner.query(
      `CREATE INDEX "IDX_41b7e7cfb04ad3fa6a33238ed3" ON "worlds_towns_towns" ("worldsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dde64744bd18169548a4bbaba9" ON "worlds_towns_towns" ("townsId") `
    );
    await queryRunner.query(`CREATE TABLE "temporary_towns"
                             (
                               "id"        varchar PRIMARY KEY NOT NULL,
                               "playerId"  varchar,
                               "worldId"   varchar,
                               "buildings" text                NOT NULL,
                               CONSTRAINT "FK_38c31c6b668f9682c21c6a2113d" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE SET NULL ON UPDATE NO ACTION,
                               CONSTRAINT "FK_602a6eb88d20a0b87250aca1ee6" FOREIGN KEY ("worldId") REFERENCES "worlds" ("id") ON DELETE SET NULL ON UPDATE NO ACTION
                             )`);
    await queryRunner.query(`INSERT INTO "temporary_towns"("id", "playerId", "worldId", "buildings")
                             SELECT "id", "playerId", "worldId", "buildings"
                             FROM "towns"`);
    await queryRunner.query(`DROP TABLE "towns"`);
    await queryRunner.query(`ALTER TABLE "temporary_towns" RENAME TO "towns"`);
    await queryRunner.query(`DROP INDEX "IDX_b165f004f35895ecf654bcbd28"`);
    await queryRunner.query(`DROP INDEX "IDX_dceaf4ed735efd62b1ab241cb5"`);
    await queryRunner.query(`CREATE TABLE "temporary_players_worlds_worlds"
                             (
                               "playersId" varchar NOT NULL,
                               "worldsId"  varchar NOT NULL,
                               CONSTRAINT "FK_b165f004f35895ecf654bcbd281" FOREIGN KEY ("playersId") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                               CONSTRAINT "FK_dceaf4ed735efd62b1ab241cb5c" FOREIGN KEY ("worldsId") REFERENCES "worlds" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                               PRIMARY KEY ("playersId", "worldsId")
                             )`);
    await queryRunner.query(`INSERT INTO "temporary_players_worlds_worlds"("playersId", "worldsId")
                             SELECT "playersId", "worldsId"
                             FROM "players_worlds_worlds"`);
    await queryRunner.query(`DROP TABLE "players_worlds_worlds"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_players_worlds_worlds" RENAME TO "players_worlds_worlds"`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b165f004f35895ecf654bcbd28" ON "players_worlds_worlds" ("playersId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dceaf4ed735efd62b1ab241cb5" ON "players_worlds_worlds" ("worldsId") `
    );
    await queryRunner.query(`DROP INDEX "IDX_d625f9da5a0963d705336988e4"`);
    await queryRunner.query(`DROP INDEX "IDX_b0f97e37b0625ded66ac23ae75"`);
    await queryRunner.query(`CREATE TABLE "temporary_worlds_players_players"
                             (
                               "worldsId"  varchar NOT NULL,
                               "playersId" varchar NOT NULL,
                               CONSTRAINT "FK_d625f9da5a0963d705336988e40" FOREIGN KEY ("worldsId") REFERENCES "worlds" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                               CONSTRAINT "FK_b0f97e37b0625ded66ac23ae751" FOREIGN KEY ("playersId") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                               PRIMARY KEY ("worldsId", "playersId")
                             )`);
    await queryRunner.query(`INSERT INTO "temporary_worlds_players_players"("worldsId", "playersId")
                             SELECT "worldsId", "playersId"
                             FROM "worlds_players_players"`);
    await queryRunner.query(`DROP TABLE "worlds_players_players"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_worlds_players_players" RENAME TO "worlds_players_players"`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d625f9da5a0963d705336988e4" ON "worlds_players_players" ("worldsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b0f97e37b0625ded66ac23ae75" ON "worlds_players_players" ("playersId") `
    );
    await queryRunner.query(`DROP INDEX "IDX_41b7e7cfb04ad3fa6a33238ed3"`);
    await queryRunner.query(`DROP INDEX "IDX_dde64744bd18169548a4bbaba9"`);
    await queryRunner.query(`CREATE TABLE "temporary_worlds_towns_towns"
                             (
                               "worldsId" varchar NOT NULL,
                               "townsId"  varchar NOT NULL,
                               CONSTRAINT "FK_41b7e7cfb04ad3fa6a33238ed3d" FOREIGN KEY ("worldsId") REFERENCES "worlds" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                               CONSTRAINT "FK_dde64744bd18169548a4bbaba9a" FOREIGN KEY ("townsId") REFERENCES "towns" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                               PRIMARY KEY ("worldsId", "townsId")
                             )`);
    await queryRunner.query(`INSERT INTO "temporary_worlds_towns_towns"("worldsId", "townsId")
                             SELECT "worldsId", "townsId"
                             FROM "worlds_towns_towns"`);
    await queryRunner.query(`DROP TABLE "worlds_towns_towns"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_worlds_towns_towns" RENAME TO "worlds_towns_towns"`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_41b7e7cfb04ad3fa6a33238ed3" ON "worlds_towns_towns" ("worldsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dde64744bd18169548a4bbaba9" ON "worlds_towns_towns" ("townsId") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_dde64744bd18169548a4bbaba9"`);
    await queryRunner.query(`DROP INDEX "IDX_41b7e7cfb04ad3fa6a33238ed3"`);
    await queryRunner.query(
      `ALTER TABLE "worlds_towns_towns" RENAME TO "temporary_worlds_towns_towns"`
    );
    await queryRunner.query(`CREATE TABLE "worlds_towns_towns"
                             (
                               "worldsId" varchar NOT NULL,
                               "townsId"  varchar NOT NULL,
                               PRIMARY KEY ("worldsId", "townsId")
                             )`);
    await queryRunner.query(`INSERT INTO "worlds_towns_towns"("worldsId", "townsId")
                             SELECT "worldsId", "townsId"
                             FROM "temporary_worlds_towns_towns"`);
    await queryRunner.query(`DROP TABLE "temporary_worlds_towns_towns"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_dde64744bd18169548a4bbaba9" ON "worlds_towns_towns" ("townsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_41b7e7cfb04ad3fa6a33238ed3" ON "worlds_towns_towns" ("worldsId") `
    );
    await queryRunner.query(`DROP INDEX "IDX_b0f97e37b0625ded66ac23ae75"`);
    await queryRunner.query(`DROP INDEX "IDX_d625f9da5a0963d705336988e4"`);
    await queryRunner.query(
      `ALTER TABLE "worlds_players_players" RENAME TO "temporary_worlds_players_players"`
    );
    await queryRunner.query(`CREATE TABLE "worlds_players_players"
                             (
                               "worldsId"  varchar NOT NULL,
                               "playersId" varchar NOT NULL,
                               PRIMARY KEY ("worldsId", "playersId")
                             )`);
    await queryRunner.query(`INSERT INTO "worlds_players_players"("worldsId", "playersId")
                             SELECT "worldsId", "playersId"
                             FROM "temporary_worlds_players_players"`);
    await queryRunner.query(`DROP TABLE "temporary_worlds_players_players"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_b0f97e37b0625ded66ac23ae75" ON "worlds_players_players" ("playersId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d625f9da5a0963d705336988e4" ON "worlds_players_players" ("worldsId") `
    );
    await queryRunner.query(`DROP INDEX "IDX_dceaf4ed735efd62b1ab241cb5"`);
    await queryRunner.query(`DROP INDEX "IDX_b165f004f35895ecf654bcbd28"`);
    await queryRunner.query(
      `ALTER TABLE "players_worlds_worlds" RENAME TO "temporary_players_worlds_worlds"`
    );
    await queryRunner.query(`CREATE TABLE "players_worlds_worlds"
                             (
                               "playersId" varchar NOT NULL,
                               "worldsId"  varchar NOT NULL,
                               PRIMARY KEY ("playersId", "worldsId")
                             )`);
    await queryRunner.query(`INSERT INTO "players_worlds_worlds"("playersId", "worldsId")
                             SELECT "playersId", "worldsId"
                             FROM "temporary_players_worlds_worlds"`);
    await queryRunner.query(`DROP TABLE "temporary_players_worlds_worlds"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_dceaf4ed735efd62b1ab241cb5" ON "players_worlds_worlds" ("worldsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b165f004f35895ecf654bcbd28" ON "players_worlds_worlds" ("playersId") `
    );
    await queryRunner.query(`ALTER TABLE "towns" RENAME TO "temporary_towns"`);
    await queryRunner.query(`CREATE TABLE "towns"
                             (
                               "id"        varchar PRIMARY KEY NOT NULL,
                               "playerId"  varchar,
                               "worldId"   varchar,
                               "buildings" text                NOT NULL
                             )`);
    await queryRunner.query(`INSERT INTO "towns"("id", "playerId", "worldId", "buildings")
                             SELECT "id", "playerId", "worldId", "buildings"
                             FROM "temporary_towns"`);
    await queryRunner.query(`DROP TABLE "temporary_towns"`);
    await queryRunner.query(`DROP INDEX "IDX_dde64744bd18169548a4bbaba9"`);
    await queryRunner.query(`DROP INDEX "IDX_41b7e7cfb04ad3fa6a33238ed3"`);
    await queryRunner.query(`DROP TABLE "worlds_towns_towns"`);
    await queryRunner.query(`DROP INDEX "IDX_b0f97e37b0625ded66ac23ae75"`);
    await queryRunner.query(`DROP INDEX "IDX_d625f9da5a0963d705336988e4"`);
    await queryRunner.query(`DROP TABLE "worlds_players_players"`);
    await queryRunner.query(`DROP INDEX "IDX_dceaf4ed735efd62b1ab241cb5"`);
    await queryRunner.query(`DROP INDEX "IDX_b165f004f35895ecf654bcbd28"`);
    await queryRunner.query(`DROP TABLE "players_worlds_worlds"`);
    await queryRunner.query(`DROP TABLE "worlds"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "towns"`);
    await queryRunner.query(`DROP TABLE "players"`);
  }
}
