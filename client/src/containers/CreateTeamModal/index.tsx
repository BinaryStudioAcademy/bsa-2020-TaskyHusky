import React, { ReactElement, ChangeEvent, useState } from 'react';
import { Modal, Image, Form, Button, Message } from 'semantic-ui-react';
import { addTeam } from '../../services/team.service';

import style from './style.module.scss';
import linksImg from 'assets/images/create-new-team.svg';

interface AddTeamPopup {
	isOpen: boolean;
	closeClb: () => void;
}

const AddTeamPopup: React.FC<AddTeamPopup> = ({ isOpen = false, closeClb }): ReactElement => {
	const [teamName, setTeamName] = useState<string>('');
	const [commonError, setCommonError] = useState<string | null>(null);
	const [errorTeamName, setErrorTeamName] = useState<null | string>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
		setErrorTeamName(null);
		setCommonError(null);
		setTeamName(e.target.value);
	};

	const handlerSubmit = async () => {
		if (!teamName) {
			return setErrorTeamName('Type team name please!');
		}
		setIsLoading(true);

		try {
			await addTeam(teamName);
			alert('Success added Team');
		} catch (e) {
			setCommonError(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal open={isOpen} onClose={closeClb} closeIcon size="small">
			<Modal.Header>Create new team</Modal.Header>
			<Modal.Content image scrolling>
				<Image size="big" src={linksImg} wrapped className={style.img} />
				<Form onSubmit={handlerSubmit} loading={isLoading}>
					<p>
						Get everyone working in one place by adding them to a team. Stay connected with @mentions,
						collaborate on work together, and efficiently manage everything from the team profile page.
					</p>
					<Form.Input
						label="Team name"
						placeholder="What's your team called?"
						value={teamName}
						onChange={handlerChange}
						error={errorTeamName}
					/>
					{commonError && <Message color="red">commonError</Message>}
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={closeClb}>Cancel</Button>
				<Button primary onClick={handlerSubmit}>
					Start
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default React.memo(AddTeamPopup);
