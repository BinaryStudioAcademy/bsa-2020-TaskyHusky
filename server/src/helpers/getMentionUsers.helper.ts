export interface UserData {
	userName: string;
	id: string;
}

export const parseDataFromXML = (text: string): UserData[] => {
	const mentionTagMatches = text.match(/<mention of='[a-zA-Z0-9-]*'>[a-zA-Z0-9 ]*<\/mention>/g);
	const START_OF_MENTION_CLOSING_TAG = -10;

	if (mentionTagMatches) {
		return mentionTagMatches.map((match) => {
			const firstQuoteIndex = match.indexOf("'");
			const lastQuoteIndex = match.indexOf("'", firstQuoteIndex + 1);
			const triangleBracketIndex = match.indexOf('>');
			const userId = match.slice(firstQuoteIndex + 1, lastQuoteIndex);
			const userName = match.slice(triangleBracketIndex + 1, START_OF_MENTION_CLOSING_TAG);

			return {
				userName,
				id: userId,
			};
		});
	}

	return [];
};
