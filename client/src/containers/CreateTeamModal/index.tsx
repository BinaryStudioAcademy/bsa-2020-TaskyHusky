import React, { ReactElement, ChangeEvent, useState } from 'react';
import { Modal, Image, Form, Button } from 'semantic-ui-react';

import style from './style.module.scss';
import linksImg from 'assets/images/create-new-team.svg';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'containers/People/logic/actions';
import { RootState } from '../../typings/rootState';
import CustomValidator from 'helpers/validation.helper';
import { NotificationManager } from 'react-notifications';
interface Props {
	isOpen: boolean;
	closeClb: () => void;
}

const AddTeamPopup: React.FC<Props> = ({ isOpen = false, closeClb }): ReactElement => {
	const [teamName, setTeamName] = useState<string>('');
	const [isErrorShown, setErrorShown] = useState<boolean>(false);
	const authStore = useSelector((state: RootState) => state.auth);
	const userId = authStore.user?.id || '';

	const { t } = useTranslation();
	const dispatch = useDispatch();

	const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTeamName(e.target.value);
	};

	const nameValidation = (title: string) => {
		const validator = new CustomValidator(title);
		const checkName = validator.checkSimpleField();

		if (checkName.errors.length > 0) {
			const timeout = 6000;
			const setErrorView = () => {
				setErrorShown(true);
				return setTimeout(() => setErrorShown(false), timeout);
			};

			if (!isErrorShown) {
				NotificationManager.error(t(checkName.errors[0]), t('error'), timeout, undefined, true);
				setErrorView();
				return null;
			}
		}
		return title;
	};

	const handlerSubmit = async () => {
		const isValid = nameValidation(teamName);
		if (isValid) {
			dispatch(actions.createTeam({ name: teamName, id: userId }));
			setTeamName('');
			closeClb();
		}
	};

	return (
		<Modal open={isOpen} onClose={closeClb} size="small" dimmer="inverted">
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
					{t('accept')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default React.memo(AddTeamPopup);
