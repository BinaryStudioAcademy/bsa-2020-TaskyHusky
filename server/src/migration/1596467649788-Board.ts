import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class Board1596467649788 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		const exampleData = [
			{ boardType: 'first' },
			{ boardType: 'second' },
		];
		await getRepository('Board').save(exampleData);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
