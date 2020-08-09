import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, TextArea, Button, Icon, Popup } from 'semantic-ui-react';

import Breadcrumbs from 'components/common/Breadcrumbs';
import Options from 'components/common/Options';
import { setBreadcrumbs } from './config/breadcrumbs';
import { setProjectActions } from './config/projectActions';

import mockAvatar from './../../assets/images/projectAvatars/viewavatar.svg';
import styles from './styles.module.scss';

interface Props {}

const ProjectSettings = (props: Props) => {
	console.log('props', props);
	const history = useHistory();
	const projectName = '12';
	const id = '12';
	const text = '12';
	const onTrash = () => {};

	const options = [
		{ key: 'm', text: 'Unassigned', value: 'unassigned' },
		{ key: 'f', text: 'Project Lead', value: 'projectLead' },
	];

	return (
		<section>
			<div className={styles.header_inner__container}>
				<div className={styles.header_inner__breadcrumbs}>
					<Breadcrumbs sections={setBreadcrumbs({ history, projectName })} />
				</div>
				<h1 className={styles.header_inner__title}>Details</h1>
				<div className={styles.header__options}>
					<Options config={setProjectActions({ id, onTrash })} />
				</div>
			</div>
			<div className={styles.form__container}>
				<Form>
					<Form.Input className={styles.form__input} label="Name" required type="text" />
					<Form.Field className={styles.form__input_key} required>
						<label>Key</label>
						<div className={styles.form__input_container}>
							<input placeholder="Example: QA" />
							<Popup
								trigger={
									<Icon name="info circle" className={styles.information__icon} size={'large'} />
								}
								position="bottom center"
								content="Changing the project key will start a background re-index of your project, and may break some external integrations."
							/>
						</div>
					</Form.Field>
					<Form.Input className={styles.form__input} label="URL" type="text" />
					<Form.Field className={styles.form__input} required>
						<label>Project type</label>
						<div className={styles.form__input_container}>
							<input placeholder="" />
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
						<label>Project category</label>
						<div className={styles.form__input_container}>
							<input placeholder="" />
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
						<label className={styles.avatar__label}>Avatar</label>
						<button type="button" className={styles.form__avatar}>
							<img className={styles.avatar__img} src={mockAvatar} alt="Project avatar" />
							<span className={styles.avatar__text}>select image</span>
						</button>
					</Form.Field>
					<Form.Field className={styles.form__area}>
						<label className={styles.avatar__label}>Description</label>
						<TextArea placeholder="Tell us more" rows={'7'} />
					</Form.Field>
					<Form.Input className={styles.form__input} label="Project lead" required type="text" />
					<Form.Field className={styles.form__input}>
						<label className={styles.avatar__label}>Default Assignee</label>
						<div className={styles.form__input_container}>
							<Form.Select
								options={options}
								placeholder="Unassigned"
								className={styles.form__input_select}
							/>
							<Popup
								trigger={
									<Icon name="info circle" className={styles.information__icon} size={'large'} />
								}
								position="top center"
								content="The default assignee when creating issues for this project."
							/>
						</div>
					</Form.Field>
					<div>
						<Button primary>Save details</Button>
						<Button>Cancel</Button>
					</div>
				</Form>
			</div>
		</section>
	);
};

export default ProjectSettings;
