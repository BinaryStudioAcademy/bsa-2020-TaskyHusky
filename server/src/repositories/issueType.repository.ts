import { EntityRepository, Repository } from 'typeorm';
import { IssueType } from '../entity/IssueType';

@EntityRepository(IssueType)
export class IssueTypeRepository extends Repository<IssueType> {
    findAll() {
        return this.find();
    }

    findOneById(id: string) {
        return this.findOneOrFail({ where: { id } });
    }

    createOne(data: IssueType) {
        const entity = this.create(data);
        return this.save(entity);
    }

    updateOneById(id: string, data: IssueType) {
        return this.update(id, data);
    }

    deleteOneById(id: string) {
        return this.delete(id);
    }
}
