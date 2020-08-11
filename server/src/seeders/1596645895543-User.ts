import { getRepository, getCustomRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { TeamsRepository } from '../repositories/teams.repository';

export class User1596645895543 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const user1 = [
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
        const user2 = [
            {
                firstName: 'Fedor',
                lastName: 'Petrov',
                email: 'test2@test.com',
                jobTitle: 'simple user',
                userSettingsId: '1234',
                password: '$2a$08$Oc43T2.RcOJV/9s2nx6wLO0t0lQ/SGxwKYCvRaTDi3oGrFKnXINyS',
                avatar: 'example2',
                department: 'example2',
                timezone: 'example2',
                organization: 'example2',
            },
        ];
        await getRepository('User').save(user2);
        await getRepository('User').save(user1);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
