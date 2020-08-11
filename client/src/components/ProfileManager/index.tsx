import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import styles from './styles.module.scss';
import { Header, Segment, Form, Button } from 'semantic-ui-react';
import SubmitedInput from 'components/SubmitedInput';
import { requestUpdateUser } from 'containers/ProfilePage/logiс/actions';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import { useDispatch } from 'react-redux';

interface Props {
	showManager: (modeToShow: string) => void;
}

const ProfileManager: React.FC<Props> = (props: Props) => {
	const { showManager } = props;
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
		dispatch(requestUpdateUser({ userData: rest } as Partial<UserProfileState>));
	};

	const onCancel = () => {
		showManager('');
	};
	return (
		<section className={styles.container}>
			<Header as="h3">About you</Header>
			<Segment className={styles.card}>
				<Form onSubmit={onSubmit}>
					<SubmitedInput
						handleChange={handleChange}
						text={firstName}
						name="firstName"
						placeholder="Your firstname"
						title="First name"
						type="text"
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={lastName}
						name="lastName"
						placeholder="Your lastname"
						title="Last name"
						type="text"
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={username}
						name="username"
						placeholder="Your username"
						title="Public name"
						type="text"
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={jobTitle}
						name="jobTitle"
						placeholder="Your jobtitle"
						title="Job title"
						type="text"
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={department}
						name="department"
						placeholder="Your department"
						title="Department"
						type="text"
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={organization}
						name="organization"
						placeholder="Your organization"
						title="Organization"
						type="text"
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={location}
						name="location"
						placeholder="Your location"
						title="Based in"
						type="text"
					/>
					<Form.Field className={styles.formFooter}>
						<Button className={styles.submitButton} type="submit">
							Save changes
						</Button>
						<Button type="text" onClick={onCancel}>
							Cancel
						</Button>
					</Form.Field>
				</Form>
			</Segment>
		</section>
	);
};

export default ProfileManager;
