const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

const getSymSet = (symbols?: string | string[]): string => {
	if (!symbols) {
		return ALPHABET;
	} else if (Array.isArray(symbols)) {
		return symbols.join('');
	} else {
		return symbols;
	}
};

const getRandomElement = <T>(array: Array<T>) => {
	const random: number = Math.random();
	const multiplied: number = random * array.length;
	const index: number = Math.floor(multiplied);
	const element: T = array[index];

	return element;
};

export const generateRandomString = (len: number, symbols?: string | string[]): string => {
	const symSet: string[] = getSymSet(symbols).split('');
	const randomArray: string[] = [];

	for (let i = 0; i < len; i++) {
		const letter: string = getRandomElement<string>(symSet);
		randomArray.push(letter);
	}

	const randomString: string = randomArray.join('');
	return randomString;
};
