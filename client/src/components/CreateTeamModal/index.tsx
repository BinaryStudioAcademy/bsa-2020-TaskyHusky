import React, { useState } from 'react';
import { Button, Header, Image, Modal, Input, Form } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import createImg from 'assets/images/team-build.svg';
import styles from './styles.module.scss';

const CreateTeamModal = () => {
	const { t } = useTranslation();
	const [teamName, setTeamName] = useState('');
	const [teamMembers, setTeamMembers] = useState('');
	const onChange = (e: React.BaseSyntheticEvent) => setTeamName(e.target.value);
	const onAddPeople = (e: React.BaseSyntheticEvent) => setTeamMembers(e.target.value);

	return (
		<Modal onClose={() => 'setOpen(false)'} open size="large">
			<Modal.Header>{t('Start a new team')}</Modal.Header>
			<Modal.Content image>
				<Image size="medium" src={createImg} wrapped />
				<Modal.Content>
					<Header size="small">
						Get everyone working in one place by adding them to a team. You may colaborate on work together
						and efficiently manage everything from the team profile page.
					</Header>
					<Form>
						<Form.Field required className={styles.del_star}>
							<label>Team name</label>
							<Input
								placeholder="What is your team called?"
								defaultValue={teamName}
								onChange={(e) => onChange(e)}
							/>
						</Form.Field>
						<Form.Field>
							<label>Invite people to your team</label>
							<Input
								placeholder="Start entering name"
								defaultValue={teamMembers}
								onChange={(e) => onAddPeople(e)}
							/>
						</Form.Field>
					</Form>
					<Modal.Actions className={styles.buttons_block}>
						<Button onClick={() => 'funcCancel'} basic>
							Cancel
						</Button>
						<Button onClick={() => 'funcOk'} primary>
							Start
						</Button>
					</Modal.Actions>
				</Modal.Content>
			</Modal.Content>
		</Modal>
	);
};

export default CreateTeamModal;
