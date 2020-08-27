import { MigrationInterface, QueryRunner, getRepository, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { Projects } from '../entity/Projects';
import { UserProfile } from '../entity/UserProfile';

export class ProjectsPeople1597700889853 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		const projectRepository = getRepository('Projects');

		const project1 = <Projects>await projectRepository.findOne({
			where: {
				id: '1fbda607-5934-484c-9667-bd35574a2f1e',
			},
		});

		const project2 = <Projects>await projectRepository.findOne({
			where: {
				id: 'e040e267-3533-4579-93fa-e749ca93f72f',
			},
		});

		const user1 = await userRepository.getByEmail('test@test.com') as UserProfile;
		const user2 = await userRepository.getByEmail('test1@test.com') as UserProfile;

		user1.projects = [project2, project1];
		user2.projects = [project1, project2];
		userRepository.save(user1);
		userRepository.save(user2);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
