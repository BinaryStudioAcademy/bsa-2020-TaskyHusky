import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { sendMentionedInComment } from '../services/email.service';
import { parseDataFromXML } from './getMentionUsers.helper';

export const parseMentionsXMLAndSendEmails = async (text: string, issueKey: string): Promise<void> => {
	const userDataSet = await parseDataFromXML(text);

	userDataSet.forEach((data) => {
		sendMentionedInComment({
			email: data.email,
			issueKey,
			userName: data.userName,
		});
	});
};
