import {MigrationInterface, QueryRunner, getCustomRepository} from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import {TeammatesRepository} from '../repositories/teammates.repository';

export class UserInvintation1597584277805 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const user1 = (await userRepository.getByEmail('test@test.com'))!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const user2 = (await userRepository.getByEmail('tzimbal.k@gmail.com'))!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const user3 = (await userRepository.getByEmail('jobs_my@gmail.com'))!;

        const teammatesRepository=getCustomRepository(TeammatesRepository);

        await teammatesRepository.createInvitation(user2.id, user1.email);
        await teammatesRepository.createInvitation(user3.id, user1.email);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
