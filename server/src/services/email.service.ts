import { SendEmailRequest, AddressList } from 'aws-sdk/clients/ses';
import AWS from '../../libs/aws';
import { awsConfig } from '../../config/aws.config';

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export type EmailArgs = {
	to: AddressList;
	subject: string;
	message: string;
	from?: string;
};

export function sendMailWithSes(args: EmailArgs) {
	const { to, message, subject, from = awsConfig.ses.from.default } = args;
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
