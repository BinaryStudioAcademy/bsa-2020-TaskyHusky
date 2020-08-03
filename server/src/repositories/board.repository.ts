import { EntityRepository, Repository } from 'typeorm';
import {Board} from '../entity/Board';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
	findByType(boardType: string) {
		return this.findOneOrFail({ where: { boardType } });
	}

	getAll(){
		return this.find();
	}
}
