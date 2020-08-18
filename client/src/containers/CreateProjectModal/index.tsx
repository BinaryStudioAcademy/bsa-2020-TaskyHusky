import React, { useState, memo } from 'react';
import { Modal, Button, Form, Checkbox, Image, Card } from 'semantic-ui-react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';

import * as actions from './logic/actions';
import getTemplatesInformation, { MethodologyInfo } from './config/templatesInformation';
import styles from './styles.module.scss';
import CustomInput from 'components/common/Input/CustomInput';
import { generateKey } from 'commonLogic/keyGenerator';

type Template = keyof typeof WebApi.Board.BoardType;

const CreateProjectModal: React.FC = () => {
	const templatesInformation = getTemplatesInformation();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const { isLoading, isModalOpened, isProjectCreated, keys, isError } = useSelector(
		(rootState: RootState) => rootState.createProject,
	);

	const [isKeyTouched, setIsKeyTouched] = useState(false);
	const [isTemplatesView, setIsTemplatesView] = useState(false);

	const [name, setName] = useState<string>('');
	const [key, setKey] = useState<string>('');
	const [template, setTemplate] = useState<Template>('Scrum');

	const [isNameValid, setIsNameValid] = useState<boolean>(false);
	const [isKeyValid, setIsKeyValid] = useState<boolean>(true);
	const [isValidErrorShown, setIsValidErrorShown] = useState<boolean>(false);

	const { description, image } = templatesInformation[template];

	if (isProjectCreated) {
		dispatch(actions.resetState());
		setName('');
		setKey('');
		setTemplate('Scrum');
		setIsNameValid(false);
		setIsKeyValid(true);
		setIsValidErrorShown(false);
	}

	const startCreatingProject = () => {
		dispatch(
			actions.startCreatingProject({
				name,
				key,
				template,
			}),
		);
	};

	const onCreateProject = (): void => {
		if (!isKeyTouched && !isNameValid) {
			setIsValidErrorShown(true);
			return;
		}

		if (!isNameValid || !isKeyValid) {
			setIsValidErrorShown(true);
			return;
		}

		startCreatingProject();
	};

	const onModalClose = () => {
		setIsTemplatesView(false);
		if (isError) {
			dispatch(actions.resetState());
			return;
		}

		dispatch(actions.closeModal());
	};

	const onModalOpen = () => {
		dispatch(actions.openModal());
		dispatch(actions.startGettingKeys());
	};

	const onNameChanged = (name: string): void => {
		const generatedKey = generateKey({ name, key, isKeyTouched, keys });
		const regexp = new RegExp('\\s{1,}', 'g');
		const removeSpaces = name.replace(regexp, ' ').trimStart();
		setName(removeSpaces);
		setKey(generatedKey);
	};

	const onKeyChanged = (key: string): void => {
		const newKey = key.trim().toUpperCase();
		if (!isKeyTouched) {
			setIsKeyTouched(true);
		}
		setKey(newKey);
	};

	const selectTemplate = (template: Template) => {
		setIsTemplatesView(false);
		setTemplate(template);
	};

	return (
		<Modal
			closeIcon
			onClose={onModalClose}
			onOpen={onModalOpen}
			open={isModalOpened}
			size={'tiny'}
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
								<CustomInput
									isValidErrorShown={isValidErrorShown}
									isDataValid={isNameValid}
									setIsDataValid={setIsNameValid}
									data={name}
									setData={onNameChanged}
									placeholder="Enter project name"
									popUpContent="Project name should contain at least 5 symbols long"
									validation={(name) => validator.isLength(name, { min: 5 })}
								/>
							</Form.Field>
							<Form.Field>
								<label>{t('key')}</label>
								<CustomInput
									isValidErrorShown={isValidErrorShown}
									isDataValid={isKeyValid}
									setIsDataValid={setIsKeyValid}
									data={key}
									setData={onKeyChanged}
									placeholder="Enter your key"
									popUpContent="Key should contain at least 2 symbols long"
									validation={(key) => validator.isLength(key, { min: 2 })}
								/>
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
						{Object.entries(templatesInformation).map(
							([name, { image, description }]: [any, MethodologyInfo]) => (
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
							),
						)}
					</Modal.Content>
				</>
			)}
		</Modal>
	);
};

export default memo(CreateProjectModal);
