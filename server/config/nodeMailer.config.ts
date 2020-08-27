import nodemailer from 'nodemailer';

export const user = process.env.GMAIL_USER;
export const email = `Tasky Husky <${user}>`;
export const password = process.env.GMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
	pool: true,
	host: 'smtp.ukr.net',
	port: 465,
	secure: true,
	auth: {
		user,
		pass: password,
	},
	tls: {
		rejectUnauthorized: false,
	},
});
