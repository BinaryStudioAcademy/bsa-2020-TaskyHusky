/* eslint-disable no-console */
import fs from 'fs';
import glob from 'glob';

function getFileName(match: string): string {
	const start = match.lastIndexOf('/');
	const end = match.lastIndexOf('.ts');
	return match.substring(start + 1, end);
}

function getModelsTypes(files: string[]): string {
	const closingBracket = '\n}';

	return files
		.map((path) => {
			const fileName = getFileName(path);
			const fileContent: string = fs.readFileSync(path, 'utf8');
			const namespaceDeclaration = `namespace WebApi.${fileName} {\n`;
			const modifiedContent = fileContent
				.trim()
				.split('\n')
				.map((it: string) => (it ? `\t${it}` : it))
				.join('\n');

			return namespaceDeclaration + modifiedContent + closingBracket;
		})
		.join('\n\n');
}

function getEntitiesTypes(fileNames: string[]): string {
	const entitiesNamespace = 'namespace WebApi.Entities {\n';
	const closingBracket = '\n}';
	const closingBracketWithTab = '\n\t}';

	const entites = fileNames
		.map((path) => {
			const fileName = getFileName(path);
			const fileContent: string = fs.readFileSync(path, 'utf8');
			const interfaceDeclaration = `\tinterface ${fileName} {\n`;
			const modifiedContent = fileContent
				.trim()
				.split('\n')
				.filter((it) => it.match(/[a-zA-z]+(!|\?): [a-zA-z]+/g))
				.map((it: string) => `\t${it.replace('!', '')}`)
				.join('\n');

			return interfaceDeclaration + modifiedContent + closingBracketWithTab;
		})
		.join('\n\n');

	return entitiesNamespace + entites + closingBracket;
}

// this script goes through all models and generates webapi.d.ts file for the client
glob('src/{entity,models}/**/*.ts', (err: Error | null, matches: string[]) => {
	const entities = matches.filter((file) => file.includes('src/entity/'));
	const models = matches.filter((file) => file.includes('src/models/'));

	const modelsTypes = getModelsTypes(models);
	const entitiesTypes = getEntitiesTypes(entities);

	const webApiTypes = `${`${modelsTypes}\n\n${entitiesTypes}`.trim()}\n`;

	fs.writeFileSync('../client/src/typings/webapi.d.ts', webApiTypes, 'utf8');
	console.log('...Written to webapi.d.ts');
});
