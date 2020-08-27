import { awsConfig } from '../../config/aws.config';
import AWS from '../../libs/aws';

const s3 = new AWS.S3();

export default (folder: string, file: Express.Multer.File, fileName: string): Promise<string> =>
	new Promise((resolve, reject) => {
		const filename = `${folder}/${fileName}`;
		if (awsConfig.bucketName) {
			s3.upload(
				{
					Bucket: awsConfig.bucketName,
					Key: filename,
					Body: file.buffer,
				},
				(err, data) => {
					if (err) {
						reject(err);
					}
					resolve(data.Location);
				},
			);
		}
	});
