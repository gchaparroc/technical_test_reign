import {MigrationInterface, QueryRunner} from "typeorm";

export class addTabs1658528532030 implements MigrationInterface {
    name = 'addTabs1658528532030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notice" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "author" character varying(255) NOT NULL, "comment_text" text NOT NULL, "_tags" text NOT NULL, CONSTRAINT "PK_705062b14410ff1a04998f86d72" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notice"`);
    }

}
