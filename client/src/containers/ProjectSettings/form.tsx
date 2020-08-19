import React, { useState, useEffect } from 'react';
import { Form, TextArea, Button, Icon, Popup, Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import * as actions from './logic/actions';

import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomInput from 'components/common/Input/CustomInput';
import validator from 'validator';

import SelectIcon from './selectIcon';
import { RootState } from 'typings/rootState';
import { startGettingKeys } from 'containers/CreateProjectModal/logic/actions';
import { validProjectKey, validProjectName } from 'helpers/validationRules';
import * as validationMessage from 'constants/ValidationMessages';

interface Props {
	projectData: WebApi.Entities.Projects;
}

const ProjectForm = ({ projectData }: Props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { keys } = useSelector((rootState: RootState) => rootState.createProject);

	const [project, setProject] = useState<WebApi.Entities.Projects>(projectData);

	const [isNameValid, setIsNameValid] = useState<boolean>(true);
	const [isKeyValid, setIsKeyValid] = useState<boolean>(true);
	const [isValidErrorShown, setIsValidErrorShown] = useState<boolean>(false);

	useEffect(() => {
		dispatch(startGettingKeys());
	}, [dispatch]);

	const [currentIcon, setCurrentIcon] = useState('');

	const projectUsers = project.users?.map((user) => ({
		key: user.id,
		text: `${user.firstName} ${user.lastName}`,
		value: user.id,
	}));

	const onProjectChange = (field: string, value: string) => {
		if (field === 'key') {
			value = value.trim().toUpperCase();
			const keyIndex = keys.findIndex((item: any) => item.key === value);

			if (keyIndex !== -1 && projectData.key !== value) {
				setIsValidErrorShown(true);
				setIsKeyValid(false);
			}
		}

		setProject((state) => ({
			...state,
			[field]: value,
		}));
	};

	const onSave = () => {
		if (!isNameValid || !isKeyValid) {
			setIsValidErrorShown(true);
			return;
		}
		dispatch(actions.startUpdatingProject({ project }));
	};

	const options = [
		{ key: 'm', text: t('unassigned'), value: 'unassigned' },
		{ key: 'f', text: t('project_lead'), value: 'projectLead' },
	];

	return (
		<div className={styles.form__container}>
			<Form>
				<Form.Field className={styles.form__input_key} required>
					<label className={styles.avatar__label}>{t('name')}</label>
					<CustomInput
						isValidErrorShown={isValidErrorShown}
						isDataValid={isNameValid}
						setIsDataValid={setIsNameValid}
						data={project.name}
						setData={(data) => onProjectChange('name', data)}
						placeholder="Enter project name"
						popUpContent={validationMessage.VM_PROJECT_NAME}
						validation={validProjectName}
						popUpPosition="bottom right"
					/>
				</Form.Field>
				<Form.Field className={styles.form__input_key} required>
					<label>{t('key')}</label>
					<div className={styles.form__input_container}>
						<CustomInput
							isValidErrorShown={isValidErrorShown}
							isDataValid={isKeyValid}
							setIsDataValid={setIsKeyValid}
							data={project.key}
							setData={(data) => onProjectChange('key', data)}
							placeholder={t('example') + ': QA'}
							popUpContent={validationMessage.VM_PROJECT_KEY}
							validation={validProjectKey}
							popUpPosition="bottom left"
						/>
						<Popup
							trigger={<Icon name="info circle" className={styles.information__icon} size={'large'} />}
							position="bottom center"
							content={t('key_info')}
						/>
					</div>
				</Form.Field>
				<Form.Input
					className={styles.form__input}
					label="URL"
					type="text"
					placeholder={'https://www...'}
					onChange={(e) => onProjectChange('url', e.target.value)}
					value={project.url}
				/>
				<Form.Field className={styles.form__input} required>
					<label>{t('project_category')}</label>
					<div className={styles.form__input_container}>
						<input placeholder={t('category')} disabled />
						<Popup
							trigger={<Icon name="info circle" className={styles.information__icon} size={'large'} />}
							position="bottom center"
							content={t('project_category_info')}
						/>
					</div>
				</Form.Field>
				<Form.Field required className={styles.form__input}>
					<label className={styles.avatar__label}>{t('avatar')}</label>
					<SelectIcon currentIcon={currentIcon} setCurrentIcon={setCurrentIcon} />
				</Form.Field>
				<Form.Field className={styles.form__area}>
					<label className={styles.avatar__label}>{t('description')}</label>
					<TextArea
						placeholder={t('project_desc')}
						rows={'7'}
						onChange={(e, data) => onProjectChange('description', data.value?.toString() || '')}
						value={project.description}
					/>
				</Form.Field>
				<Form.Field className={styles.form__input}>
					<label className={styles.avatar__label}>{t('lead')}</label>
					<Dropdown
						placeholder={`${project.lead?.firstName} ${project.lead?.lastName}`}
						search
						selection
						options={projectUsers}
						onChange={(e, data) => onProjectChange('lead', data.value?.toString() || '')}
					/>
				</Form.Field>
				<Form.Field className={styles.form__input}>
					<label className={styles.avatar__label}>{t('default_assignee')}</label>
					<div className={styles.form__input_container}>
						<Form.Select
							options={options}
							placeholder={t('unassigned')}
							className={styles.form__input_select}
						/>
						<Popup
							trigger={<Icon name="info circle" className={styles.information__icon} size={'large'} />}
							position="top center"
							content={t('default_assignee_desc')}
						/>
					</div>
				</Form.Field>
				<div>
					<Button primary onClick={onSave}>
						{t('save_details')}
					</Button>
					<Link to="/projects">{t('cancel')}</Link>
				</div>
			</Form>
		</div>
	);
};

export default ProjectForm;
