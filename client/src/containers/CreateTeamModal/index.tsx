import React, { ReactElement, ChangeEvent, useState } from 'react';
import { Modal, Image, Form, Button } from 'semantic-ui-react';

import style from './style.module.scss';
import linksImg from 'assets/images/create-new-team.svg';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'containers/People/logic/actions';
import { RootState } from '../../typings/rootState';

interface Props {
	isOpen: boolean;
	closeClb: () => void;
}

const AddTeamPopup: React.FC<Props> = ({ isOpen = false, closeClb }): ReactElement => {
	const [teamName, setTeamName] = useState<string>('');
	const [errorTeamName, setErrorTeamName] = useState<null | string>(null);
	const authStore = useSelector((state: RootState) => state.auth);
	const userId = authStore.user?.id || '';

	const { t } = useTranslation();
	const dispatch = useDispatch();

	const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
		setErrorTeamName(null);
		setTeamName(e.target.value);
	};

	const handlerSubmit = async () => {
		if (!teamName) {
			return setErrorTeamName('Type team name please!');
		}

		dispatch(actions.createTeam({ name: teamName, id: userId }));
		setTeamName('');
		closeClb();
	};

	return (
		<Modal open={isOpen} onClose={closeClb} closeIcon size="small">
			<Modal.Header>{t('create_team_modal_header')}</Modal.Header>
			<Modal.Content image scrolling>
				<Image size="big" src={linksImg} wrapped className={style.img} />
				<Form onSubmit={handlerSubmit}>
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
				<Button
					onClick={() => {
						setTeamName('');
						closeClb();
					}}
				>
					{t('cancel')}
				</Button>
				<Button primary onClick={handlerSubmit}>
					{t('start')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default React.memo(AddTeamPopup);
