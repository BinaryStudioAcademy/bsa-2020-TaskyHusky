/* eslint-disable */
export const Enums = {
	'WebApi.Board': {
		BoardType: {
			Scrum: 'Scrum',
			Kanban: 'Kanban',
		},
	},
};

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
})();
