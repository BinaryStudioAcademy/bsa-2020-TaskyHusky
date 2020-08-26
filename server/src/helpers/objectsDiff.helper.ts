import { CompareWith, isEqual } from './isEqual.helper';

export const getDiffPropNames = <T0 extends Object, T1 extends Object>(
	o0: T0,
	o1: T1,
	compareWith: CompareWith = '===',
): string[] => {
	const propNames: string[] = [];

	for (const key in o0) {
		if (Object.prototype.hasOwnProperty.call(o0, key)) {
			const element0 = o0[key];
			const element1 = key in o1 ? (o1 as any)[key] : undefined;

			if (!isEqual(element0, element1, compareWith) && key in o1) {
				propNames.push(key);
			}
		}
	}

	return propNames;
};
