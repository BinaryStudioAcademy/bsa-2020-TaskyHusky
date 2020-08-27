import AWS from 'aws-sdk';
import { awsConfig } from '../config/aws.config';

AWS.config.update({
	accessKeyId: awsConfig.key,
	secretAccessKey: awsConfig.secret,
	region: awsConfig.ses.region,
});

export default AWS;
