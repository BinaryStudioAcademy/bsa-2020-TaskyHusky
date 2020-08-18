import React from 'react';
import { getUsername } from './getUsername.helper';

export const getXMLText = (stringText: string, users: WebApi.Entities.UserProfile[]): string => {
	const matches = stringText.match(/@[a-zA-Z0-9 ]*>/g);
	let displayText = stringText;

	if (matches) {
		matches.forEach((match) => {
			const mentionUsername = match.slice(1, -1);
			const mentionUser = (users ?? []).find((user) => getUsername(user) === mentionUsername);

			if (mentionUser) {
				displayText = displayText.replace(
					match,
					` <mention of='${mentionUser.id}'>${mentionUsername}</mention> `,
				);
			}
		});
	}

	return displayText;
};

export const getJSXText = (comment: WebApi.Result.IssueCommentResult): JSX.Element[] => {
	let displayText: JSX.Element[] = [];
	let lastMatchIndex = 0;
	const matches = comment.text.match(/<mention of='[a-zA-Z0-9-]*'>[a-zA-Z0-9 ]*<\/mention>/g);

	if (matches) {
		matches.forEach((match, matchIndex) => {
			const currMatchIndex = comment.text.indexOf(match, lastMatchIndex);
			const START_OF_MENTION_CLOSING_TAG_INDEX = -10;
			const linkName = '@' + match.slice(match.indexOf('>', 1) + 1, START_OF_MENTION_CLOSING_TAG_INDEX);
			const firstIdIndex = match.indexOf("'") + 1;
			const lastIdIndex = match.indexOf("'", firstIdIndex + 1);
			const linkHREF = '/profile/' + match.slice(firstIdIndex, lastIdIndex);

			displayText.push(
				<React.Fragment key={matchIndex + '-f'}>
					{comment.text.slice(lastMatchIndex, currMatchIndex)}
				</React.Fragment>,
			);

			displayText.push(
				<a rel="noopener noreferrer" target="_blank" href={linkHREF} key={matchIndex + '-a'}>
					{linkName}
				</a>,
			);

			lastMatchIndex = currMatchIndex + match.length;
		});

		displayText.push(
			<React.Fragment key={matches.length}>
				{comment.text.slice(lastMatchIndex, comment.text.length)}
			</React.Fragment>,
		);
	} else {
		displayText = [<React.Fragment key={0}>{comment.text}</React.Fragment>];
	}

	return displayText;
};
