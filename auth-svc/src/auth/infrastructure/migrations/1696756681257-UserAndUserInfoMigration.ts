import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAndUserInfoMigration1696756681257
  implements MigrationInterface
{
  name = 'UserAndUserInfoMigration1696756681257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_info\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`sex\` enum ('Male', 'Female') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_59c55ac40f267d450246040899\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(255) NOT NULL, \`user_name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_info\` ADD CONSTRAINT \`FK_59c55ac40f267d450246040899e\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_info\` DROP FOREIGN KEY \`FK_59c55ac40f267d450246040899e\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`REL_59c55ac40f267d450246040899\` ON \`user_info\``,
    );
    await queryRunner.query(`DROP TABLE \`user_info\``);
  }
}
