import {MigrationInterface, QueryRunner, getCustomRepository} from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import {TeammatesRepository} from '../repositories/teammates.repository';

export class UserInvintation1597584277805 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const user1 = (await userRepository.getByEmail('test@test.com'))!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const user2 = (await userRepository.getByEmail('test1@test.com'))!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const user3 = (await userRepository.getByEmail('jobs_my@gmail.com'))!;

        const teammatesRepository=getCustomRepository(TeammatesRepository);

        await teammatesRepository.createInvitation(user1.id, user2.id);
        await teammatesRepository.createInvitation(user1.id, user3.id);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
