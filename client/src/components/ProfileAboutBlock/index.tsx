import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import ProfileAboutItem from 'components/ProfileAboutItem';
import geo from 'icons/profile/geo.svg';
import toolbox from 'icons/profile/toolbox.svg';
import union from 'icons/profile/Union.svg';
import reorder from 'icons/profile/reorder.svg';
import clock from 'icons/profile/clock.svg';

interface Props {
	isCurrentUser: boolean;
	jobTitle: string;
	organization: string;
	department: string;
	location: string;
}

const ProfileAboutBlock: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { jobTitle, organization, department, location, isCurrentUser } = props;
	const currentTime = '5:07pm';
	return (
		<div>
			<h3 className={styles.header}>{t('about')}</h3>
			{(jobTitle || isCurrentUser) && (
				<ProfileAboutItem text={jobTitle} placeholder={t('placeholder_job')} icon={toolbox} />
			)}
			{(department || isCurrentUser) && (
				<ProfileAboutItem text={department} placeholder={t('placeholder_department')} icon={reorder} />
			)}
			{(organization || isCurrentUser) && (
				<ProfileAboutItem text={organization} placeholder={t('placeholder_organization')} icon={union} />
			)}
			{(location || isCurrentUser) && (
				<ProfileAboutItem text={location} placeholder={t('placeholder_location')} icon={geo} />
			)}
			{(currentTime || isCurrentUser) && (
				<ProfileAboutItem text={currentTime} placeholder={t('placeholder_location')} icon={clock} />
			)}
		</div>
	);
};

export default ProfileAboutBlock;
