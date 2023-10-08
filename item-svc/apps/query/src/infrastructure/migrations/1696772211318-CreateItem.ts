import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItem1696772211318 implements MigrationInterface {
    name = 'CreateItem1696772211318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`item\` (\`id\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`status\` enum ('Stocking', 'Bought') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ee4429a8fe2b5758456617e1ef\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ee4429a8fe2b5758456617e1ef\` ON \`item\``);
        await queryRunner.query(`DROP TABLE \`item\``);
    }

}
