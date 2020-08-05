import { getRepository } from 'typeorm';

export class UserSeeder {
	public static async execute() {
		const exampleData = [
			{
				firstName: 'Ivan',
				lastName: 'Ivanov',
				email: 'test@test.com',
				jobTitle: 'simple user',
				userSettingsId: '123',
				password: '$2a$08$Oc43T2.RcOJV/9s2nx6wLO0t0lQ/SGxwKYCvRaTDi3oGrFKnXINyS',
				avatar: 'example',
				department: 'example',
				timezone: 'example',
				organization: 'example',
			},
		];
		await getRepository('User').save(exampleData);
	}
}
