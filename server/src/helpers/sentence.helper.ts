export const asSentence = (str: string): string => {
	const capital = str.slice(0, 1).toUpperCase();
	const part2 = str.split(' ').map(camelCaseToWords).join(' ').slice(1).toLowerCase();
	return capital + part2;
};

export const camelCaseToWords = (camelCase: string): string => {
	return camelCase.replace(/[A-Z]/, (letter) => ` ${letter.toLowerCase()}`);
};
