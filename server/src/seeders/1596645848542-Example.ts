import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class Example1596645848542 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exampleData = [
            { name: 'first', text: 'first text' },
            { name: 'second', text: 'second text' },
        ];
        await getRepository('Example').save(exampleData);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
