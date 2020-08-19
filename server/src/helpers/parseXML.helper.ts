import { sendMentionedInComment } from '../services/email.service';
import { parseDataFromXML } from './getMentionUsers.helper';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';

export const parseMentionsXMLAndSendEmails = async (text: string, issueKey: string): Promise<void> => {
	const userDataSet = parseDataFromXML(text);

	await Promise.all(
		userDataSet.map(async (data) => {
			const userRepository = getCustomRepository(UserRepository);
			const user = await userRepository.getById(data.id);

			sendMentionedInComment({
				email: user.email,
				issueKey,
				userName: data.userName,
			});
		}),
	);
};
