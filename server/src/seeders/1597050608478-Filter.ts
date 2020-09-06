import { MigrationInterface, QueryRunner, getRepository, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';

export class Filter1597050608478 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user1 = (await userRepository.getByEmail('test@test.com'))!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user2 = (await userRepository.getByEmail('test1@test.com'))!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user3 = (await userRepository.getByEmail('tzimbal.k@gmail.com'))!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user4 = (await userRepository.getByEmail('karpenkodanylo@gmail.com'))!;

		const filters = [
			{
				owner: user1,
				name: 'In progress filter',
			},
			{
				owner: user1,
				name: 'Filter name',
			},
			{
				owner: user1,
				name: 'Epic filter',
			},
			{
				owner: user2,
				name: 'Done issues filter',
			},
			{
				owner: user2,
				name: 'Custom Filter',
			},
			{
				owner: user3,
				name: 'Advanced filter',
			},
			{
				owner: user3,
				name: 'Filter for my issue',
			},
			{
				owner: user4,
				name: 'Danylo filter for my issue',
			},
			{
				owner: user4,
				name: 'My own filter',
			},
		];
		await getRepository('Filter').save(filters);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
