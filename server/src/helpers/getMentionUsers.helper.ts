import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';

export interface UserData {
	userName: string;
	email: string;
}

export const parseDataFromXML = (text: string): Promise<UserData[]> => {
	const mentionTagMatches = text.match(/<mention of='[a-zA-Z0-9-]*'>[a-zA-Z0-9 ]*<\/mention>/g);
	const START_OF_MENTION_CLOSING_TAG = -10;

	if (mentionTagMatches) {
		return Promise.all(
			mentionTagMatches.map(async (match) => {
				const firstQuoteIndex = match.indexOf("'");
				const lastQuoteIndex = match.indexOf("'", firstQuoteIndex + 1);
				const triangleBracketIndex = match.indexOf('>');
				const userId = match.slice(firstQuoteIndex + 1, lastQuoteIndex);
				const userRepository = getCustomRepository(UserRepository);
				const user = await userRepository.getById(userId);
				const userName = match.slice(triangleBracketIndex + 1, START_OF_MENTION_CLOSING_TAG);

				return {
					userName,
					email: user.email,
				};
			}),
		);
	}

	return Promise.resolve([]);
};
