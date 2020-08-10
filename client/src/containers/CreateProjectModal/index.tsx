import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form, Checkbox, Image, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';

import * as actions from './logic/actions';
import getTemplatesInformation from './config/templatesInformation';
import styles from './styles.module.scss';

type ProjectTemplate = 'Scrum' | 'Kanban' | 'Bug tracking';

const CreateProjectModal = () => {
	const templatesInformation = getTemplatesInformation();
	const dispatch = useDispatch();
	const history = useHistory();
	const { t } = useTranslation();

	const { isLoading, isModalOpened, isProjectCreated } = useSelector(
		(rootState: RootState) => rootState.createProject,
	);

	if (isProjectCreated) {
		dispatch(actions.resetState());
	}

	const [isKeyTouched, setIsKeyTouched] = useState(false);
	const [isTemplatesView, setIsTemplatesView] = useState(false);

	const [name, setName] = useState<string>('');
	const [key, setKey] = useState<string>('');
	const [template, setTemplate] = useState<string>('Scrum');

	const { description, image } = templatesInformation[template as ProjectTemplate];

	const onCreateProject = (): void => {
		dispatch(
			actions.startCreatingProject({
				name,
				key,
				template,
			}),
		);
	};

	const generateKey = (name: string): string => {
		let result = key;
		if (!isKeyTouched) {
			result = name
				.split(' ')
				.filter(Boolean)
				.map((word) => word[0].toUpperCase())
				.join('');
		}
		return result;
	};

	const onModalClose = () => {
		dispatch(actions.closeModal());
		setIsTemplatesView(false);
	};

	const onModalOpen = () => {
		dispatch(actions.openModal());
	};

	const onNameChanged = (event: ChangeEvent<HTMLInputElement>): void => {
		const name = event.target.value;
		const key = generateKey(name);
		setName(name);
		setKey(key);
	};

	const onKeyChanged = (event: ChangeEvent<HTMLInputElement>): void => {
		const key = event.target.value;
		if (!isKeyTouched) {
			setIsKeyTouched(true);
		}
		setKey(key);
	};

	const selectTemplate = (template: string) => {
		setIsTemplatesView(false);
		setTemplate(template);
	};

	return (
		<Modal
			closeIcon
			onClose={onModalClose}
			onOpen={onModalOpen}
			open={isModalOpened}
			size={!isTemplatesView ? 'tiny' : undefined}
			dimmer="inverted"
			trigger={<Button primary>{t('create_project')}</Button>}
		>
			{!isTemplatesView ? (
				<>
					<Modal.Header>{t('create_project')}</Modal.Header>

					<Modal.Content>
						<Form className={styles.form_container}>
							<Form.Field>
								<label>{t('name')}</label>
								<input onChange={onNameChanged} value={name} placeholder={t('enter_proj_name')} />
							</Form.Field>
							<Form.Field>
								<label>{t('key')}</label>
								<input placeholder={t('enter_a_key')} onChange={onKeyChanged} value={key} />
							</Form.Field>
							<Form.Field>
								<Checkbox label={t('share_settings_with_existing_project')} disabled={true} />
							</Form.Field>
						</Form>
						<p>{t('template')}</p>
						<div className={styles.flex_container}>
							<Image src={image} className={styles.modal__image} />
							<div>
								<h2>{template}</h2>
								<p>{description}</p>
								<Button color="grey" onClick={() => setIsTemplatesView(true)} disabled={isLoading}>
									{t('change_template')}
								</Button>
							</div>
						</div>
					</Modal.Content>
					<Modal.Actions>
						<Button color="grey" onClick={onModalClose}>
							{t('cancel')}
						</Button>
						<Button
							content={t('create')}
							labelPosition="right"
							icon="checkmark"
							onClick={onCreateProject}
							primary
							loading={isLoading}
							disabled={isLoading}
						/>
					</Modal.Actions>
				</>
			) : (
				<>
					<Modal.Header>
						<h2 className={styles.modal__title}>{t('choose_classic_template')}</h2>
						<p className={styles.modal__description}>{description}</p>
					</Modal.Header>
					<Modal.Content className={styles.cards_container}>
						{Object.entries(templatesInformation).map(([name, { image, description }]) => (
							<Card
								key={name}
								className={styles.card__container}
								image={<Image src={image} className={styles.card__image} alt={name + ' image'} />}
								header={name}
								description={description}
								extra={
									<div className={styles.card__actions_container}>
										<Link className={styles.card__link} to={''}>
											{t('whats_this')}
										</Link>
										<Button
											className={styles.card__select_template}
											onClick={() => selectTemplate(name)}
										>
											{t('select')}
										</Button>
									</div>
								}
							/>
						))}
					</Modal.Content>
				</>
			)}
		</Modal>
	);
};

export default CreateProjectModal;
