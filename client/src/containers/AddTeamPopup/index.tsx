import React, { ReactElement, useState } from 'react';
import { Modal, Image, Form, Button } from 'semantic-ui-react';
import style from './style.module.scss';
import linksImg from 'assets/images/create-new-team.svg';

interface AddTeamPopup {
	isOpen: boolean;
	closeClb: () => void;
}

const AddTeamPopup: React.FC<AddTeamPopup> = ({ isOpen = false, closeClb }): ReactElement => {
	const [teamName, setTeamName] = useState('');

	const handlerSubmit = () => {};

	return (
		<Modal open={isOpen} onClose={closeClb} closeIcon size="small">
			<Modal.Header>Create new team</Modal.Header>
			<Modal.Content image scrolling>
				<Image size="big" src={linksImg} wrapped className={style.img} />
				<Form>
					<p>
						Get everyone working in one place by adding them to a team. Stay connected with @mentions,
						collaborate on work together, and efficiently manage everything from the team profile page.
					</p>
					<Form.Input
						label="Team name"
						placeholder="What's your team called?"
						value={teamName}
						onChange={(e) => setTeamName(e.target.value)}
					/>
					<Form.Input
						label="Invite people to your team"
						placeholder="What's your team called?"
						className={style.teamField}
					/>
					<small>You can invite up to 10 people at a time</small>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={closeClb}>Cancel</Button>
				<Button primary>Start</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default React.memo(AddTeamPopup);
