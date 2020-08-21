/* eslint-disable no-console */
import fs from 'fs';

export function runTimeFixGenerator(webApiTypes: string) {
	let runTimeFix = webApiTypes;
	// remove all interfaces (we need this only for enums)
	runTimeFix = runTimeFix.replace(/interface [^{]*\{\s*(\n\s*[^\s][^\n]+)*\s*\}/g, '');
	// remove empty namespaces (the namespaces that don't have any enum)
	runTimeFix = runTimeFix.replace(/namespace [^{}]+{\s+}/gm, '');
	// replace namespaces declarations with object initialization
	runTimeFix = runTimeFix.replace(/namespace (.*) {/g, '"$1": {');
	// replaces enums with property declaration
	runTimeFix = runTimeFix.replace(/export enum (.*) {/g, '"$1": {');
	// remove redundant line breaks
	runTimeFix = runTimeFix.replace(/^\s*$/gm, '');
	// add ',' between enums and namespaces
	runTimeFix = runTimeFix.replace(/}\s*([^{}\s])/gs, '}, $1');
	// replace '=' with ':' because ':' should be used in object initialization
	runTimeFix = runTimeFix.replace(/=/g, ':');
	runTimeFix = `/* eslint-disable */\nexport const Enums = {\n${runTimeFix}};`;
	runTimeFix += `\n\n
	(function () {
		function getNamespace(nsName: string) {
			let ns: any = window;
			nsName.split('.').forEach((nsPart) => {
				if (ns[nsPart] !== undefined) {
					ns = ns[nsPart];
				} else {
					ns = ns[nsPart] = {};
				}
			});
			return ns;
		}
	
		for (let nsName of Object.keys(Enums)) {
			const ns = getNamespace(nsName);
			Object.assign(ns, (Enums as any)[nsName]);
		}
	})();`;
	fs.writeFileSync('../client/src/typings/runTimeFix.ts', runTimeFix, 'utf8');
	console.log('...Written to runTimeFix.ts');
}
