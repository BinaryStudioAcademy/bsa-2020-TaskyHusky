import { Client } from '@elastic/elasticsearch';
import { Issue } from '../entity/Issue';
import { elasticSearchHost } from '../../config/es.config';

const client = new Client({ node: elasticSearchHost });

interface ElasticI {
	index: string;
}

type IssueElasticData = {
	id: string;
	description: string;
	summary: string;
};

type BulkCreateOption = { index: { _index: string; _id: string } };
class Elastic implements ElasticI {
	index = 'documentIndex';

	constructor(index: string) {
		this.index = index;
	}

	async createIndexIfNotExist(index: string) {
		const indexExists = await this.indexExists(index);
		if (indexExists.body) {
			return { index };
		}

		return client.indices.create({
			index,
		});
	}

	async deleteIndexIfExist(index: string) {
		const indexExists = await this.indexExists(index);
		if (indexExists.body) {
			return client.indices.delete({
				index,
			});
		}
		return {
			deleted: true,
		};
	}

	indexExists(index: string) {
		return client.indices.exists({
			index,
		});
	}

	bulk(issues: Issue[]) {
		const body = [] as (IssueElasticData | BulkCreateOption)[];
		issues.forEach((issue) => {
			body.push(
				{ index: { _index: this.index, _id: issue.id } },
				{ id: issue.id, description: issue.description || '', summary: issue.summary },
			);
		});
		return client.bulk({ refresh: true, body });
	}

	update(issue: Issue) {
		return client.update({
			index: 'issue',
			type: '_doc',
			id: issue.id,
			body: {
				doc: { id: issue.id, description: issue.description || '', summary: issue.summary },
			},
		});
	}

	addData(issue: Issue) {
		return client.create({
			index: this.index,
			id: issue.id,
			type: '_doc',
			body: { id: issue.id, description: issue.description || '', summary: issue.summary },
		});
	}

	async getMatchedIssueIDs(input: string) {
		const { body } = await client.search({
			index: this.index,
			body: {
				query: {
					query_string: {
						query: `*${input}*`,
						fields: ['description', 'summary'],
					},
				},
			},
		});

		/* eslint no-underscore-dangle: [1, { "allow": ["_id"] }] */
		return body.hits.hits.map((hit: { _id: string }) => hit._id) as string[];
	}

	delete(id: string) {
		return client.deleteByQuery({
			index: this.index,
			body: {
				query: {
					match: { id },
				},
			},
		});
	}
}

export default Elastic;
