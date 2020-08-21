import React, { ReactElement, ChangeEvent, useState } from 'react';
import { Modal, Image, Form, Button } from 'semantic-ui-react';
import { addTeam } from '../../services/team.service';

import style from './style.module.scss';
import linksImg from 'assets/images/create-new-team.svg';
import { useTranslation } from 'react-i18next';

interface Props {
	isOpen: boolean;
	closeClb: () => void;
}

const AddTeamPopup: React.FC<Props> = ({ isOpen = false, closeClb }): ReactElement => {
	const [teamName, setTeamName] = useState<string>('');
	const [errorTeamName, setErrorTeamName] = useState<null | string>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { t } = useTranslation();

	const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
		setErrorTeamName(null);
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
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal open={isOpen} onClose={closeClb} closeIcon size="small">
			<Modal.Header>{t('create_team_modal_header')}</Modal.Header>
			<Modal.Content image scrolling>
				<Image size="big" src={linksImg} wrapped className={style.img} />
				<Form onSubmit={handlerSubmit} loading={isLoading}>
					<p>{t('create_team_modal_text')}</p>
					<Form.Input
						label={t('team_name')}
						placeholder={t('create_team_modal_placeholder')}
						value={teamName}
						onChange={handlerChange}
						error={errorTeamName}
					/>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={closeClb}>{t('cancel')}</Button>
				<Button primary onClick={handlerSubmit}>
					{t('start')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default React.memo(AddTeamPopup);
