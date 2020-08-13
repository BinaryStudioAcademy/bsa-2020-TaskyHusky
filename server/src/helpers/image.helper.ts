import path from 'path';
import { awsTeam } from '../../config/aws.config';
import AWS from '../../libs/aws';

const s3 = new AWS.S3();

export default (folder: string, file: Express.Multer.File) =>
	new Promise((resolve, reject) => {
		const timestamp = +new Date();
		const filename = `${folder}/${timestamp}${path.extname(file.originalname)}`;
		if (awsTeam) {
			s3.upload(
				{
					Bucket: awsTeam,
					Key: filename,
					Body: file.buffer,
				},
				(err, data) => {
					if (err) {
						return reject(err);
					}
					return resolve(data.Location);
				},
			);
		}
	});
