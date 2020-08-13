import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';
import styles from './styles.module.scss';
import { Header, Segment, Form, Button } from 'semantic-ui-react';
import SubmitedInput from 'components/SubmitedInput';
import { requestUpdateUser } from 'containers/ProfilePage/logiс/actions';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import { useDispatch } from 'react-redux';

interface Props {
	showManager: (modeToShow: string) => void;
	updateUser: (changedUser: Partial<UserProfileState>) => void;
}

const ProfileManager: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { showManager, updateUser } = props;
	const userData = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const [user, setUser] = useState(userData);
	const { firstName, lastName, username, jobTitle, department, location, organization } = user;
	const handleChange = (event: any) => {
		setUser({
			...user,
			[(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
		});
	};
	const onSubmit = () => {
		const { editMode, isLoading, ...rest } = user;
		updateUser(user);
		dispatch(requestUpdateUser({ ...rest } as Partial<UserProfileState>));
	};

	const onCancel = () => {
		showManager('');
	};
	return (
		<section className={styles.container}>
			<Header as="h3">{t('about_you')}</Header>
			<Segment className={styles.card}>
				<Form onSubmit={onSubmit}>
					<SubmitedInput
						handleChange={handleChange}
						text={firstName}
						propKey="firstName"
						placeholder={t('placeholder_lastname')}
						title={t('first_name')}
						type="text"
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={lastName}
						propKey={t('last_name')}
						placeholder={t('placeholder_firstname')}
						title="Last name"
						type="text"
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={username}
						propKey="username"
						placeholder={t('placeholder_username')}
						title={t('public_name')}
						type="text"
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={jobTitle}
						propKey="jobTitle"
						placeholder={t('placeholder_job')}
						title={t('job_title')}
						type="text"
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={department}
						propKey="department"
						placeholder={t('placeholder_department')}
						title={t('department')}
						type="text"
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={organization}
						propKey="organization"
						placeholder={t('placeholder_organization')}
						title={t('organization')}
						type="text"
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={location}
						propKey="location"
						placeholder={t('placeholder_location')}
						title={t('based_in')}
						type="text"
					/>
					<Form.Field className={styles.formFooter}>
						<Button className={styles.submitButton} type="submit">
							{t('save_changes')}
						</Button>
						<Button type="text" onClick={onCancel}>
							{t('cancel')}
						</Button>
					</Form.Field>
				</Form>
			</Segment>
		</section>
	);
};

export default ProfileManager;
