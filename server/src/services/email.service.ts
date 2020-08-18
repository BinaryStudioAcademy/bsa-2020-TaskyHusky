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
