import { EntityRepository, Repository } from 'typeorm';
import { Example } from '../entity/Example';

@EntityRepository(Example)
export class ExampleRepository extends Repository<Example> {
	findByName(name: string) {
		return this.findOneOrFail({ where: { name } });
	}
}
