import { v4 } from 'uuid';
import { EntityRepository, Repository, DeleteResult, getCustomRepository, Any } from 'typeorm';
import { UserRepository } from './user.repository';
import { Filter } from '../entity/Filter';

@EntityRepository(Filter)
export class FilterRepository extends Repository<Filter> {
	findByName(name: string) {
		return this.findOneOrFail({ where: { name } });
	}

	getAll(): Promise<Filter[]> {
		return this.find({
			relations: ['owner', 'staredBy', 'filterParts'],
		});
	}

	async getById(id: string) {
		return this.findOne({
			relations: ['owner', 'filterParts', 'filterParts.filterDef'],
			where: {
				id,
			},
		});
	}

	async getTeammateFilters(userId: string) {
		const userRepository = getCustomRepository(UserRepository);

		const user = await userRepository.getUserTeammates(userId);

		const teammatesIds = user?.teammates?.map(({ id }) => id);
		const ids = teammatesIds ? [...teammatesIds, userId] : [userId];
		return this.find({
			relations: ['owner', 'staredBy'],
			where: {
				owner: {
					id: Any(ids),
				},
			},
		});
	}

	async getRecentFilters(userId: string, limit: number = 5) {
		return (await this.getTeammateFilters(userId))
			.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
			.slice(0, limit);
	}

	async getFavFilters(userId: string) {
		return (await this.getTeammateFilters(userId)).filter((f) =>
			f.staredBy?.find((stargazer) => stargazer.id === userId),
		);
	}

	async createItem(data: Filter): Promise<Filter> {
		const { name, filterParts, owner } = data;

		const filter = await this.save({ name, owner });
		if (filterParts) {
			filter.filterParts = filterParts.map((filterPart) => ({ ...filterPart, id: v4() }));
		}

		return this.save(filter);
	}

	async updateItem(data: Filter): Promise<Filter> {
		return this.save(data);
	}

	deleteById(id: string): Promise<DeleteResult> {
		return this.delete(id);
	}
}
