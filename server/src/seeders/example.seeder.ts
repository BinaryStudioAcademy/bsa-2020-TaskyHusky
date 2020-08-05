import { getRepository } from 'typeorm';

export class ExampleSeeder {
	public static async execute() {
		const exampleData = [
			{ name: 'first', text: 'first text' },
			{ name: 'second', text: 'second text' },
		];
		await getRepository('Example').save(exampleData);
	}
}
