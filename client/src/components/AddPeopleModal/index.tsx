import React, { ReactElement, ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'semantic-ui-react';

import * as actions from '../../containers/People/logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../typings/rootState';

interface Props {
	isOpen: boolean;
	closeClb: () => void;
}

const AddPeopleModal: React.FC<Props> = ({ isOpen = false, closeClb }): ReactElement => {
	const [email, setEmail] = useState('');
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const authStore = useSelector((rootStore: RootState) => rootStore.auth);

	const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlerSubmit = async () => {
		dispatch(actions.addPeople({ id: authStore.user?.id || '', email }));

		closeClb();
	};

	return (
		<Modal open={isOpen} onClose={closeClb} closeIcon size="tiny">
			<Modal.Header>{t('add_people')}</Modal.Header>
			<Modal.Content image scrolling>
				<Form onSubmit={handlerSubmit}>
					<p>{t('add_people_text')}</p>
					<Form.Input
						placeholder={t('add_people_email_placeholder')}
						value={email}
						onChange={handlerChange}
					/>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={closeClb}>{t('cancel')}</Button>
				<Button primary onClick={handlerSubmit} disabled={email === ''}>
					{t('send')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default React.memo(AddPeopleModal);
