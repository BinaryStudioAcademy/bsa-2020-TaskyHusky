import { email as nodeMailerEmail, transporter } from '../../config/nodeMailer.config';
import { appHost, frontendPort } from '../../config/app.config';

export const sendToken = (email: string, resetPasswordToken: string) => {
	const mailOptions = {
		from: nodeMailerEmail,
		to: email,
		subject: 'Please, confirm your email',
		text: `http://${appHost}:${frontendPort}/reset-password/${resetPasswordToken} your token will expire in 1 day`,
	};

	return transporter.sendMail(mailOptions, (err) => {
		if (err) throw err;
	});
};

export interface CommentMentionEmailParams {
	userName: string;
	issueKey: string;
	email: string;
}

export const sendMentionedInComment = (params: CommentMentionEmailParams) => {
	const { email, issueKey, userName } = params;

	const mailOptions = {
		from: nodeMailerEmail,
		to: email,
		subject: 'Mention',
		html: `Dear ${userName}, you have been mentioned in issue comment!<br />
			Go <a rel="noopener noreferrer" href='http://${appHost}:${frontendPort}/issue/${issueKey}'>here</a> and check out!`,
	};

	return transporter.sendMail(mailOptions, (err) => {
		if (err) throw err;
	});
};
