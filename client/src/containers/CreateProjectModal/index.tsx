import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form, Checkbox, Image, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import kanbanImg from '../../assets/images/kanban.svg';
import scrumImg from '../../assets/images/scrum.svg';
import bugTrackingImg from '../../assets/images/bug_tracking.svg';
import styles from './styles.module.scss';
import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import Spinner from 'components/Spinner';

type projectTemplate = 'Scrum' | 'Kanban' | 'Bug tracking';

const templatesInformation = {
	Kanban: {
		description:
			'Monitor work in a continuous flow for agile teams ◦ Suits teams who control work volume from a backlog',
		image: kanbanImg,
	},
	Scrum: {
		description:
			'Manage stories, tasks, and workflows for a scrum team ◦ For teams that deliver work on a regular schedule',
		image: scrumImg,
	},
	'Bug tracking': {
		description: 'Manage a list of development tasks and bugs ◦ Great for teams who don\u0027t need a board',
		image: bugTrackingImg,
	},
};

const CreateProjectModal = () => {
	const dispatch = useDispatch();
	const { isLoading, isModalOpened } = useSelector((rootState: RootState) => rootState.createProject);

	const [isKeyTouched, setIsKeyTouched] = useState(false);
	const [isTemplatesView, setIsTemplatesView] = useState(false);

	const [name, setName] = useState<string>('');
	const [key, setKey] = useState<string>('');
	const [template, setTemplate] = useState<string>('Scrum');

	const { description, image } = templatesInformation[template as projectTemplate];

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
			trigger={<Button primary>Create project</Button>}
		>
			{!isTemplatesView ? (
				<>
					<Modal.Header>Create project</Modal.Header>

					<Modal.Content>
						<Form className={styles.form_container}>
							<Form.Field>
								<label>Name</label>
								<input onChange={onNameChanged} value={name} placeholder="Enter a project name" />
							</Form.Field>
							<Form.Field>
								<label>Key</label>
								<input placeholder="Enter a key" onChange={onKeyChanged} value={key} />
							</Form.Field>
							<Form.Field>
								<Checkbox label="Share settings with an existing project" disabled={true} />
							</Form.Field>
						</Form>
						<p>Template</p>
						<div className={styles.flex_container}>
							<Image src={image} className={styles.modal__image} />
							<div>
								<h2>{template}</h2>
								<p>{description}</p>
								<Button color="grey" onClick={() => setIsTemplatesView(true)} disabled={isLoading}>
									Change template
								</Button>
							</div>
						</div>
					</Modal.Content>
					<Modal.Actions>
						<Button color="grey" onClick={onModalClose}>
							Close
						</Button>
						<Button
							content="Create"
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
						<h2 className={styles.modal__title}>Choose a classic template</h2>
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
											{'What\u0027s this?'}
										</Link>
										<Button
											className={styles.card__select_template}
											onClick={() => selectTemplate(name)}
										>
											Select
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
