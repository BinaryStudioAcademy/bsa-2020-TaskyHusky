import { Keys } from './../../containers/CreateProjectModal/logic/actionTypes';
import { alphabet } from './data';

interface GenerateKeyArgs {
	name: string;
	key: string;
	isKeyTouched: boolean;
	keys: Keys[];
}

export const generateKey = ({ name, key, isKeyTouched, keys: keysFromDB }: GenerateKeyArgs): string => {
	let alphaItemIndex = 0;
	let temporaryKey = key;
	let generatedKey = key;
	let stringItemIndex = 0;

	if (!isKeyTouched) {
		const spaceIndex = name.trimEnd().search(' ');

		if (spaceIndex !== -1) {
			temporaryKey = name
				.split(' ')
				.filter(Boolean)
				.map((word) => word[0].toUpperCase())
				.join('');
		} else {
			temporaryKey = name.substr(0, 2).toUpperCase();
		}
	}

	function keygen(rawKey: string): void {
		if (rawKey === '') {
			return;
		}

		const keyIndex = keysFromDB.findIndex((keyItem: any) => keyItem.key === rawKey);

		if (keyIndex === -1) {
			generatedKey = rawKey;
			rawKey = '';
			return;
		}

		rawKey = rawKey.substring(0, rawKey.length - 1) + alphabet[alphaItemIndex];

		if (alphaItemIndex !== alphabet.length - 1) {
			alphaItemIndex++;
		} else {
			alphaItemIndex = 0;
			rawKey = rawKey.substring(0, rawKey.length - 2) + alphabet[stringItemIndex] + alphabet[alphaItemIndex];
			stringItemIndex++;
		}

		generatedKey = rawKey;
		keygen(rawKey);
	}

	stringItemIndex = 0;
	alphaItemIndex = 0;
	keygen(temporaryKey);

	return generatedKey;
};
