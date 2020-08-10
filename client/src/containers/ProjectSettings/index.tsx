import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, TextArea, Button, Icon, Popup } from 'semantic-ui-react';

import Breadcrumbs from 'components/common/Breadcrumbs';
import Options from 'components/common/Options';
import { setBreadcrumbs } from './config/breadcrumbs';
import { setProjectActions } from './config/projectActions';

import mockAvatar from 'assets/images/projectAvatars/viewavatar.svg';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import ProjectSidebar from 'components/ProjectSidebar';

const ProjectSettings = () => {
	const { t } = useTranslation();
	const history = useHistory();
	const projectName = 'NBA';
	const id = '12';
	const onTrash = () => {};

	const options = [
		{ key: 'm', text: t('unassigned'), value: 'unassigned' },
		{ key: 'f', text: t('project_lead'), value: 'projectLead' },
	];

	return ProjectSidebar(
		<section>
			<div className={styles.header_inner__container}>
				<div className={styles.header_inner__breadcrumbs}>
					<Breadcrumbs sections={setBreadcrumbs({ history, projectName })} />
				</div>
				<h1 className={styles.header_inner__title}>{t('details')}</h1>
				<div className={styles.header__options}>
					<Options config={setProjectActions({ id, onTrash })} />
				</div>
			</div>
			<div className={styles.form__container}>
				<Form>
					<Form.Input
						className={styles.form__input}
						label={t('name')}
						required
						type="text"
						placeholder={t('project_name')}
					/>
					<Form.Field className={styles.form__input_key} required>
						<label>{t('key')}</label>
						<div className={styles.form__input_container}>
							<input placeholder={t('example') + ': QA'} />
							<Popup
								trigger={
									<Icon name="info circle" className={styles.information__icon} size={'large'} />
								}
								position="bottom center"
								content="Changing the project key will start a background re-index of your project, and may break some external integrations."
							/>
						</div>
					</Form.Field>
					<Form.Input className={styles.form__input} label="URL" type="text" placeholder={'https://www...'} />
					<Form.Field className={styles.form__input} required>
						<label>{t('project_type')}</label>
						<div className={styles.form__input_container}>
							<input placeholder={t('type')} />
							<Popup
								trigger={
									<Icon name="info circle" className={styles.information__icon} size={'large'} />
								}
								position="bottom center"
								content="To change project type, create a new project and bulk move your issues into it."
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
								content="You haven't created any project categories yet."
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
						<Button primary>{t('save_details')}</Button>
						<Button>{t('cancel')}</Button>
					</div>
				</Form>
			</div>
		</section>,
	);
};

export default ProjectSettings;
