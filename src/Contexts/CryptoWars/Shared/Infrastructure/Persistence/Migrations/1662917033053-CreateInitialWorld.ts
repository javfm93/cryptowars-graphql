import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialWorld1662917033053 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO worlds VALUES('93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b', 'Genesis World');
    `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
