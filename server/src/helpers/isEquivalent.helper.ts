export const isEquivalent = (val0: any, val1: any): boolean => {
	if (typeof val0 === 'object' && typeof val1 === 'object') {
		const props0 = Object.getOwnPropertyNames(val0);
		const props1 = Object.getOwnPropertyNames(val1);

		if (val0 === val1) return true;
		if (props0.length !== props1.length) return false;

		const result = props0
			.map((propName) => {
				if (val0[propName] !== val1[propName]) {
					return false;
				}

				return true;
			})
			.reduce((a, b) => a && b);

		return result;
	}

	return false;
};
