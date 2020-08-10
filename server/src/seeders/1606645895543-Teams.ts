import { getRepository, getCustomRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { Teams } from '../entity/Teams';

export class Team1606645895543 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const user1 = (await userRepository.getByEmail('test@test.com'))!;

        const team1 = new Teams();
        team1.description = 'Our new team for cool projects';
        team1.name = 'Avengers v2';
        team1.links = [
            JSON.stringify({
                id: '1',
                http: 'http://localhost:3002',
                name: 'BSA Project Jira',
                description: 'Our cool project'
            })
        ]
        team1.users = [user1]

        await getRepository('Teams').save(team1);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
