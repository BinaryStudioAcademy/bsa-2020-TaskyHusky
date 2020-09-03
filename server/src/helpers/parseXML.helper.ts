import { getCustomRepository } from 'typeorm';
import { sendMailWithSes } from '../services/email.service';
import { parseDataFromXML } from './getMentionUsers.helper';
import { UserRepository } from '../repositories/user.repository';
import { issueMentionTemplate } from './emailTemplates.helper';

export const parseMentionsXMLAndSendEmails = async (text: string, issueKey: string): Promise<void> => {
	const userDataSet = parseDataFromXML(text);

	await Promise.all(
		userDataSet.map(async (data) => {
			const userRepository = getCustomRepository(UserRepository);
			const user = await userRepository.getById(data.id);
			await sendMailWithSes({
				to: [user.email],
				subject: 'You has been mentioned',
				message: issueMentionTemplate(issueKey, data.userName),
			});
		}),
	);
};
