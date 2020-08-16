import AWS from 'aws-sdk';
import { awsAccessKeyId, awsSecretAccessKey } from '../config/aws.config';

const options = {
	accessKeyId: awsAccessKeyId,
	secretAccessKey: awsSecretAccessKey,
};

AWS.config.update(options);

export default AWS;
