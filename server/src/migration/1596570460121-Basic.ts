import { MigrationInterface, QueryRunner } from 'typeorm';

export class Basic1596570460121 implements MigrationInterface {
	name = 'Basic1596570460121';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE "board_column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "columnName" character varying NOT NULL, "status" character varying NOT NULL, "isResolutionSet" boolean NOT NULL, "boardId" uuid, CONSTRAINT "PK_0273ece23af9b3e55ad6af2fdaa" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "boardType" character varying NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "example" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "text" character varying NOT NULL, CONSTRAINT "PK_608dd5fd6f0783062b07346ed1c" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "filter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3c5d89c1607d52ce265c7348f70" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "filter_definition" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filterType" character varying NOT NULL, "dataType" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_1126b0ea469fbd1880ea0d34615" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "filter_part" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "searchText" character varying NOT NULL, "filterId" uuid, "filterDefId" uuid, CONSTRAINT "REL_89e99a897e110720d1d5a670a4" UNIQUE ("filterId"), CONSTRAINT "REL_efe7e7ddd51f22e719ab5291a4" UNIQUE ("filterDefId"), CONSTRAINT "PK_c76664c8553a261673277917d0f" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "issue_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "icon" character varying NOT NULL, "color" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_cbaac4689773f8f434641a1b6b7" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "priority" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "icon" character varying NOT NULL, "color" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_413921aa4a118e20f361ceba8b4" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "issue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "summary" character varying NOT NULL, "boardColumnID" character varying NOT NULL, "labels" character varying array NOT NULL, "attachments" character varying array NOT NULL, "links" character varying array NOT NULL, "description" character varying NOT NULL, "sprintID" character varying NOT NULL, "projectID" character varying NOT NULL, "issueKey" character varying NOT NULL, "assignedID" character varying NOT NULL, "creatorID" character varying NOT NULL, "typeId" uuid, "priorityId" uuid, CONSTRAINT "PK_f80e086c249b9f3f3ff2fd321b7" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying, "lastName" character varying, "avatar" character varying, "department" character varying, "timezone" character varying, "organization" character varying, "email" character varying NOT NULL, "jobTitle" character varying, "userSettingsId" character varying, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'ALTER TABLE "board_column" ADD CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "filter_part" ADD CONSTRAINT "FK_89e99a897e110720d1d5a670a4b" FOREIGN KEY ("filterId") REFERENCES "filter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "filter_part" ADD CONSTRAINT "FK_efe7e7ddd51f22e719ab5291a4f" FOREIGN KEY ("filterDefId") REFERENCES "filter_definition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "issue" ADD CONSTRAINT "FK_9c4834e0a4c2b4df6bdb909963c" FOREIGN KEY ("typeId") REFERENCES "issue_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "issue" ADD CONSTRAINT "FK_b5b73e84c04d98bc2261b987fe4" FOREIGN KEY ("priorityId") REFERENCES "priority"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "issue" DROP CONSTRAINT "FK_b5b73e84c04d98bc2261b987fe4"');
		await queryRunner.query('ALTER TABLE "issue" DROP CONSTRAINT "FK_9c4834e0a4c2b4df6bdb909963c"');
		await queryRunner.query('ALTER TABLE "filter_part" DROP CONSTRAINT "FK_efe7e7ddd51f22e719ab5291a4f"');
		await queryRunner.query('ALTER TABLE "filter_part" DROP CONSTRAINT "FK_89e99a897e110720d1d5a670a4b"');
		await queryRunner.query('ALTER TABLE "board_column" DROP CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72"');
		await queryRunner.query('DROP TABLE "user"');
		await queryRunner.query('DROP TABLE "issue"');
		await queryRunner.query('DROP TABLE "priority"');
		await queryRunner.query('DROP TABLE "issue_type"');
		await queryRunner.query('DROP TABLE "filter_part"');
		await queryRunner.query('DROP TABLE "filter_definition"');
		await queryRunner.query('DROP TABLE "filter"');
		await queryRunner.query('DROP TABLE "example"');
		await queryRunner.query('DROP TABLE "board"');
		await queryRunner.query('DROP TABLE "board_column"');
	}
}
