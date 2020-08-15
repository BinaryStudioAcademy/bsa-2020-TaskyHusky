import { email as nodeMailerEmail, transporter } from '../../config/nodeMailer.config';
import { appHost, appPort } from '../../config/app.config';

export const sendToken = (email: string, resetPasswordToken: string) => {
	const mailOptions = {
		from: nodeMailerEmail,
		to: email,
		subject: 'Please, confirm your email',
		text: `http://${appHost}:${appPort}/api/auth/reset-password/${resetPasswordToken} your token will expire in 1 day`,
	};

	return transporter.sendMail(mailOptions, (err) => {
		if (err) throw err;
	});
};
