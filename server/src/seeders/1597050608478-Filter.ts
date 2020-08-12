import { MigrationInterface, QueryRunner, getRepository, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { Projects } from '../entity/Projects';

export class Filter1597050608478 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user1 = (await userRepository.getByEmail('test@test.com'))!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user2 = (await userRepository.getByEmail('test1@test.com'))!;
		const filters = [
			{
				owner: user1,
				name: 'In progress filter',
				staredBy: [user1, user2],
			},
			{
				owner: user2,
				name: 'Done issues filter',
				staredBy: [user2],
			},
			{
				owner: user2,
				name: 'Custom Filter',
			},
		];
		await getRepository('Filter').save(filters);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
