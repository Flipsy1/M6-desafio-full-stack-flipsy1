import { MigrationInterface, QueryRunner } from "typeorm";

export class phoneColumUpdate1679687060000 implements MigrationInterface {
    name = 'phoneColumUpdate1679687060000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "telefone" TO "phone"`);
        await queryRunner.query(`ALTER TABLE "contacts" RENAME CONSTRAINT "UQ_3e8ba81fb64ba00f644d6a22435" TO "UQ_84cae51c485079bdd8cdf1d828f"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "telefone" TO "phone"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_ce560737283930ec16034de9228" TO "UQ_a000cca60bcf04454e727699490"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_a000cca60bcf04454e727699490" TO "UQ_ce560737283930ec16034de9228"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "phone" TO "telefone"`);
        await queryRunner.query(`ALTER TABLE "contacts" RENAME CONSTRAINT "UQ_84cae51c485079bdd8cdf1d828f" TO "UQ_3e8ba81fb64ba00f644d6a22435"`);
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "phone" TO "telefone"`);
    }

}
