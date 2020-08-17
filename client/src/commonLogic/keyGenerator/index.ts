import { Keys } from './../../containers/CreateProjectModal/logic/actionTypes';
import { alphabet } from './data';

interface GenerateKeyArgs {
	name: string;
	key: string;
	isKeyTouched: boolean;
	keys: Keys[];
}

export const generateKey = ({ name, key, isKeyTouched, keys }: GenerateKeyArgs): string => {
	let alphaItemIndex = 0;
	let temporaryKey = key;
	let generatedKey = key;
	let stringItem = -1;

	if (!isKeyTouched) {
		const spaceIndex = name.trimEnd().search(' ');

		if (spaceIndex !== -1) {
			temporaryKey = name
				.split(' ')
				.filter(Boolean)
				.map((word) => word[0].toUpperCase())
				.join('');
		} else {
			temporaryKey = name.substr(0, 2).padStart(2, name[0]).toUpperCase();
		}
	}

	function keygen(result: string): void {
		if (result === '') {
			return;
		}

		const index = keys.findIndex((item: any) => item.key === result);

		if (index === -1) {
			generatedKey = result;
			result = '';
			return;
		}

		result = result.substring(0, result.length + stringItem) + alphabet[alphaItemIndex];
		alphaItemIndex++;

		if (alphaItemIndex === alphabet.length - 1) {
			stringItem++;
		}

		generatedKey = result;
		keygen(result);
	}

	stringItem = -1;
	alphaItemIndex = 0;
	keygen(temporaryKey);

	return generatedKey;
};
