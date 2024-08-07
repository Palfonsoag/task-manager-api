import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationDemo1722450921685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "name" TO "full_name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "full_name" TO "name"`,
    ); //
  }
}