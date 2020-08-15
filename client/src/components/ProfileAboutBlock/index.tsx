import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import styles from 'components/ProfileAside/styles.module.scss';
import ProfileAboutItem from 'components/ProfileAboutItem';

interface Props {
	isCurrentUser: boolean;
	mockData?: any;
	jobTitle: string;
	organization: string;
	department: string;
	location: string;
}

const ProfileAboutBlock: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { jobTitle, organization, department, location, isCurrentUser } = props;
	return (
		<Container className={styles.infoBlock}>
			<Header as="h3" className={styles.infoBlock__header}>
				{t('about')}
			</Header>
			{(jobTitle || isCurrentUser) && (
				<ProfileAboutItem text={jobTitle} placeholder={t('placeholder_job')} icon="briefcase" />
			)}
			{(department || isCurrentUser) && (
				<ProfileAboutItem text={department} placeholder={t('placeholder_department')} icon="code branch" />
			)}
			{(organization || isCurrentUser) && (
				<ProfileAboutItem text={organization} placeholder={t('placeholder_organization')} icon="fax" />
			)}
			{(location || isCurrentUser) && (
				<ProfileAboutItem text={location} placeholder={t('placeholder_location')} icon="map marker alternate" />
			)}
		</Container>
	);
};

export default ProfileAboutBlock;
