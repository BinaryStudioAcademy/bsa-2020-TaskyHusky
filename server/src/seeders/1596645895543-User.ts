import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class User1596645895543 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const exampleData = [
			{
				firstName: 'Ivan',
				lastName: 'Ivanov',
				username: '',
				email: 'test1@test.com',
				jobTitle: 'Database administrator',
				userSettingsId: '123',
				location: '',
				password: '$2a$08$Oc43T2.RcOJV/9s2nx6wLO0t0lQ/SGxwKYCvRaTDi3oGrFKnXINyS',
				avatar: '',
				department: '',
				organization: 'Binary studio',
				filters: [],
			},
			{
				firstName: 'Alesya',
				lastName: 'Afanaseva',
				email: 'test@test.com',
				username: 'Alesyaa',
				jobTitle: 'Junior Full-Stack developer',
				userSettingsId: '123',
				location: 'Ukraine Kyiv',
				password: '$2a$08$Oc43T2.RcOJV/9s2nx6wLO0t0lQ/SGxwKYCvRaTDi3oGrFKnXINyS',
				avatar:
					'https://avatars0.githubusercontent.com/u/48657633?s=400&u=5cc9c4f2d19d71faa651e50bed16c812d87c1233&v=4',
				department: 'IT Department',
				organization: 'Tasky-Husky company',
				filters: [],
			},
			{
				firstName: 'Kostya',
				lastName: 'Tsymbal',
				email: 'tzimbal.k@gmail.com',
				username: 'Alesyaa',
				jobTitle: 'Junior Full-Stack developer',
				userSettingsId: '123',
				location: 'Ukraine Kyiv',
				password: '$2a$08$Oc43T2.RcOJV/9s2nx6wLO0t0lQ/SGxwKYCvRaTDi3oGrFKnXINyS',
				avatar:
					'https://avatars0.githubusercontent.com/u/48657633?s=400&u=5cc9c4f2d19d71faa651e50bed16c812d87c1233&v=4',
				department: 'IT Department',
				organization: 'Tasky-Husky company',
				filters: [],
			},
		];

		await getRepository('UserProfile').save(exampleData);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
