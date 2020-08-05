import { EntityRepository, Repository } from 'typeorm';

import { Projects } from '../entity/Projects';

@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects> {}
