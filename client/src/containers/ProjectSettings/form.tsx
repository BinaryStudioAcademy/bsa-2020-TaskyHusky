import React, { useState } from 'react';
import { Form, TextArea, Button, Icon, Popup } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import * as actions from './logic/actions';

import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import mockAvatar from 'assets/images/projectAvatars/viewavatar.svg';
import { Link, Redirect } from 'react-router-dom';

interface Props {
	projectData: WebApi.Entities.Projects;
}

const ProjectForm = ({ projectData }: Props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const [project, setProject] = useState<WebApi.Entities.Projects>(projectData);
	const { name, key } = project;

	const onProjectChange = (field: string, value: string) => {
		setProject((state) => ({
			...state,
			[field]: value,
		}));
	};

	const onSave = () => {
		dispatch(actions.startUpdatingProject({ project }));
	};

	const options = [
		{ key: 'm', text: t('unassigned'), value: 'unassigned' },
		{ key: 'f', text: t('project_lead'), value: 'projectLead' },
	];

	return (
		<>
			{!projectData.id ? (
				<Redirect to={'/projects'} />
			) : (
				<div className={styles.form__container}>
					<Form>
						<Form.Input
							className={styles.form__input}
							label={t('name')}
							required
							type="text"
							placeholder={t('project_name')}
							value={name}
							onChange={(e) => onProjectChange('name', e.target.value)}
						/>
						<Form.Field className={styles.form__input_key} required>
							<label>{t('key')}</label>
							<div className={styles.form__input_container}>
								<input
									placeholder={t('example') + ': QA'}
									value={key}
									onChange={(e) => onProjectChange('key', e.target.value)}
								/>
								<Popup
									trigger={
										<Icon name="info circle" className={styles.information__icon} size={'large'} />
									}
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
						/>
						<Form.Field className={styles.form__input} required>
							<label>{t('project_type')}</label>
							<div className={styles.form__input_container}>
								<input placeholder={t('type')} />
								<Popup
									trigger={
										<Icon name="info circle" className={styles.information__icon} size={'large'} />
									}
									position="bottom center"
									content={t('project_type_info')}
								/>
							</div>
						</Form.Field>
						<Form.Field className={styles.form__input} required>
							<label>{t('project_category')}</label>
							<div className={styles.form__input_container}>
								<input placeholder={t('category')} />
								<Popup
									trigger={
										<Icon name="info circle" className={styles.information__icon} size={'large'} />
									}
									position="bottom center"
									content={t('project_category_info')}
								/>
							</div>
						</Form.Field>
						<Form.Field required className={styles.form__input}>
							<label className={styles.avatar__label}>{t('avatar')}</label>
							<button type="button" className={styles.form__avatar}>
								<img className={styles.avatar__img} src={mockAvatar} alt="Project avatar" />
								<span className={styles.avatar__text}>{t('select_image')}</span>
							</button>
						</Form.Field>
						<Form.Field className={styles.form__area}>
							<label className={styles.avatar__label}>{t('description')}</label>
							<TextArea placeholder={t('project_desc')} rows={'7'} />
						</Form.Field>
						<Form.Input
							className={styles.form__input}
							label={t('project_lead')}
							placeholder={t('project_lead_name')}
							required
							type="text"
						/>
						<Form.Field className={styles.form__input}>
							<label className={styles.avatar__label}>{t('default_assignee')}</label>
							<div className={styles.form__input_container}>
								<Form.Select
									options={options}
									placeholder={t('unassigned')}
									className={styles.form__input_select}
								/>
								<Popup
									trigger={
										<Icon name="info circle" className={styles.information__icon} size={'large'} />
									}
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
			)}
		</>
	);
};

export default ProjectForm;
