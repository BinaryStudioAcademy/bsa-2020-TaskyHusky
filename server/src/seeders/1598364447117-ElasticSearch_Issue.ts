import { MigrationInterface, QueryRunner, getCustomRepository } from 'typeorm';
import { IssueRepository } from '../repositories/issue.repository';
import Elastic from '../services/elasticsearch.service';

export class ElasticSearchIssue1598364447117 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const issues = await getCustomRepository(IssueRepository).findAll();
		console.log('issuesn\n\n\n\n\n\n\n\n\n', issues.length);

		const elastic = new Elastic('issue');
		await elastic.createIndexIfNotExist('issue');
		await elastic.bulk(issues);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
