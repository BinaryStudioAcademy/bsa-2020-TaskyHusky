import { SendEmailRequest, AddressList } from 'aws-sdk/clients/ses';
import AWS from '../../libs/aws';
import { awsConfig } from '../../config/aws.config';
import { appHost, frontendPort } from '../../config/app.config';
import { sendEmail } from '../helpers/email.worker';

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export type EmailArgs = {
	to: AddressList;
	subject: string;
	message: string;
	from?: string;
};

function sendMailWithSes(args: EmailArgs) {
	const { to, subject, message, from = awsConfig.ses.from.default } = args;
	const params: SendEmailRequest = {
		Destination: { ToAddresses: to },
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: message,
				},
			},
			Subject: { Charset: 'UTF-8', Data: subject },
		},
		ReturnPath: from,
		Source: from,
	};

	return new Promise((resolve, reject) => {
		ses.sendEmail(params, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

export const EmailService = {
	sendEmail: sendMailWithSes,
};

export const sendToken = (email: string, resetPasswordToken: string) => {
	const mailOptions: EmailArgs = {
		to: ['admin@taskyhusky.xyz'],
		subject: 'Please, confirm your email',
		message: `http://${appHost}:${frontendPort}/reset-password/${resetPasswordToken} your token will expire in 1 day`,
	};

	sendEmail(mailOptions);
};

export interface CommentMentionEmailParams {
	userName: string;
	issueKey: string;
	email: string;
}

export const sendMentionedInComment = (params: CommentMentionEmailParams) => {
	const { email, issueKey, userName } = params;
	const mailOptions: EmailArgs = {
		to: ['admin@taskyhusky.xyz'],
		subject: 'Mention',
		message: `Dear ${userName}, you have been mentioned in issue comment!<br />
		Go <a rel="noopener noreferrer" href='http://${appHost}:${frontendPort}/issue/${issueKey}'>here</a> and check out!`,
	};

	sendEmail(mailOptions);
};
