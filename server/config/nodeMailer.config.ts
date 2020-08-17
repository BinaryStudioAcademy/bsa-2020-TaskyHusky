import nodemailer from 'nodemailer';

export const email = process.env.GMAIL_USER;
export const password = process.env.GMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
	pool: true,
	host: 'smtp.ukr.net',
	port: 465,
	secure: true,
	auth: {
		user:email,
		pass:password
	},
});
