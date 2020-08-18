import { MigrationInterface, QueryRunner, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserProfile } from '../entity/UserProfile';
import { TeamRepository } from '../repositories/teams.repository';

export class Team1597345244377 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		const teamRepository = getCustomRepository(TeamRepository);

		const teamPromises = await [
			{
				id: 'Quality Engineer',
				color: 'Red',
				name: 'Lang LLC',
				creator: {
					id: '48e60f10-9498-4870-9e7b-11681e213454',
					firstName: 'Mel',
					lastName: 'McCullock',
					email: 'efodden1@webnode.com',
					avatar: 'https://robohash.org/harumrepellendusdolorum.bmp?size=200x200&set=set1',
					jobTitle: 'Staff Scientist',
				},
			},
			{
				id: 'Office Assistant I',
				color: 'Fuscia',
				name: 'Orn-Aufderhar',
				creator: {
					id: '474d2249-4d17-4f88-88ab-08ed22fe8723',
					firstName: 'Glynnis',
					lastName: 'Foxley',
					email: 'bhussy2@deliciousdays.com',
					avatar: 'https://robohash.org/voluptatibussolutaveritatis.png?size=200x200&set=set1',
					jobTitle: 'Assistant Media Planner',
				},
			},
			{
				id: 'Dental Hygienist',
				color: 'Indigo',
				name: 'VonRueden-Yost',
				creator: {
					id: '9ee76267-a351-470b-a656-c386a2e4a6a2',
					firstName: 'Hagan',
					lastName: 'McGarrell',
					email: 'pwetherill3@sun.com',
					avatar: 'https://robohash.org/eumidvoluptas.jpg?size=200x200&set=set1',
					jobTitle: 'Editor',
				},
			}
		].map(async (team) => {
			const { creator, id, ...teamDataToAdd } = team;

			const user = <UserProfile>await userRepository.getByEmail(creator.email);
			const teamToCreate = { ...teamDataToAdd, createdBy: user, links: [] };

			// @ts-ignore
			const createdTeam = await teamRepository.createOne(teamToCreate);

			return createdTeam;
		});

		const teams = await Promise.all(teamPromises);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
