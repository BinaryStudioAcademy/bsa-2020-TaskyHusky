import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { CurrentLink } from './index';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

type Props = {
	onClose: () => void;
	onConfirm: (arg: CurrentLink) => void;
	currentLink?: CurrentLink;
};

const CreateLink = ({ onClose, currentLink, onConfirm }: Props) => {
	const { t } = useTranslation();

	const [newLink, setnewLink] = useState(
		currentLink || {
			http: '',
			name: '',
			description: '',
		},
	);
	const onChange = (e: React.BaseSyntheticEvent) => {
		setnewLink({
			...newLink,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<Modal onClose={onClose} open size="tiny">
			<Modal.Header>{t('add_link')}</Modal.Header>
			<Modal.Content>
				<Form size="big">
					<Form.Field>
						<label>{t('web_address')}</label>
						<input
							value={newLink.http}
							onChange={(e) => onChange(e)}
							placeholder="For example: http://google.com"
							name="http"
						/>
					</Form.Field>
					<Form.Field>
						<label>{t('title')}</label>
						<input
							value={newLink.name}
							onChange={(e) => onChange(e)}
							placeholder={t('for_example_my_first_project')}
							name="name"
						/>
					</Form.Field>
					<Form.Field>
						<label>{t('small_description')}</label>
						<textarea
							name="description"
							onChange={(e) => onChange(e)}
							defaultValue={newLink.description}
							placeholder={t('add_small_specification')}
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button
					content={t('accept')}
					primary
					labelPosition="left"
					icon="checkmark"
					onClick={() => onConfirm(newLink)}
				/>
				<Button basic className={styles.edit_btn} onClick={onClose}>
					<span className={styles.edit_btn_value}>{t('cancel')}</span>
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default CreateLink;
