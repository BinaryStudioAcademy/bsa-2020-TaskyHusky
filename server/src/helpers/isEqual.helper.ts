export type CompareWith = '===' | '==' | ((val0: any, val1: any) => boolean);

export const isEqual = (val0: any, val1: any, compareWith: CompareWith): boolean => {
	switch (compareWith) {
		case '===':
			return val0 === val1;
		case '==':
			return val0 == val1;
		default:
			return compareWith(val0, val1);
	}
};
