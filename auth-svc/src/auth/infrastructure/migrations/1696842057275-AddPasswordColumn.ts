import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordColumn1696842057275 implements MigrationInterface {
  name = 'AddPasswordColumn1696842057275';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
  }
}
