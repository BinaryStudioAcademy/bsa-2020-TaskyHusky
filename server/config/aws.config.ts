export const fileSize = 10000000; // ~ 10MB
export const avatarFolder = 'avatars';
export const issueAttachmentFolder = 'issue/attchments';

export const awsConfig = {
	key: process.env.ACCESS_KEY_ID,
	secret: process.env.SECRET_ACCESS_KEY,
	bucketName: process.env.BUCKET_NAME,
	ses: {
		from: {
			default: '"TaskyHusky Team" <admin@taskyhusky.xyz>',
		},
		region: 'eu-west-2',
	},
};
