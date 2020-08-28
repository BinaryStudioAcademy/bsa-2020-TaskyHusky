import { CompareWith, isEqual } from './isEqual.helper';

export const getDiffPropNames = <T0 extends Record<string, unknown>, T1 extends Record<string, unknown>>(
	o0: T0,
	o1: T1,
	compareWith: CompareWith = '===',
): string[] => {
	const propNames: string[] = [];

	Object.keys(o0).forEach((key) => {
		if (Object.prototype.hasOwnProperty.call(o0, key)) {
			const element0 = o0[key];
			const element1 = key in o1 ? (o1 as any)[key] : undefined;

			if (!isEqual(element0, element1, compareWith) && key in o1) {
				propNames.push(key);
			}
		}
	});

	return propNames;
};
