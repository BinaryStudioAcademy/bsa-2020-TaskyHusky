import { Repository, EntityRepository } from 'typeorm';
import { Priority } from '../entity/Priority';

@EntityRepository(Priority)
export class PriorityRepository extends Repository<Priority> {
    findAll() {
        return this.find();
    }

    findOneById(id: string) {
        return this.findOneOrFail({ where: { id } });
    }

    createOne(data: Priority) {
        const entity = this.create(data);
        return this.save(entity);
    }

    updateOneById(id: string, data: Priority) {
        return this.update(id, data);
    }

    deleteOneById(id: string) {
        return this.delete(id);
    }
}
