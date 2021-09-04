import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordForAuth1630651667151 implements MigrationInterface {
  name = 'AddPasswordForAuth1630651667151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "password" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP COLUMN "password"`,
    );
  }
}
