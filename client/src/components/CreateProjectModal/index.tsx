import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form, Checkbox, Image, Card } from 'semantic-ui-react';

import kanbanImg from './../../assets/images/kanban.svg';
import scrumImg from './../../assets/images/scrum.svg';
import bugTrackingImg from './../../assets/images/bug_tracking.svg';
import styles from './styles.module.scss';
import { projectTypes } from './../../containers/Projects';
import { Link } from 'react-router-dom';

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
interface Props {
	onCreateProject(): void;
	onSetProject(project: projectTypes): any;
	project: projectTypes;
}

const CreateProjectModal = ({ onCreateProject, onSetProject, project: { name, key, template } }: Props) => {
	const [isModalShown, setIsModalShown] = useState(false);
	const [isKeyTouched, setIsKeyTouched] = useState(false);
	const [isTemplatesView, setIsTemplatesView] = useState(false);
	const { description, image } = templatesInformation[template as projectTemplate];

	const generateKey = (name: string): string => {
		let result = key as string;
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
		setIsModalShown(false);
		setIsTemplatesView(false);
	};

	const onNameChanged = (event: ChangeEvent<HTMLInputElement>): void => {
		const name = event.target.value;
		const key = generateKey(name);
		onSetProject({ name, key } as projectTypes);
	};

	const onKeyChanged = (event: ChangeEvent<HTMLInputElement>): void => {
		const key = event.target.value;
		if (!isKeyTouched) {
			setIsKeyTouched(true);
		}
		onSetProject({ key } as projectTypes);
	};

	const selectTemplate = (template: string) => {
		setIsTemplatesView(false);
		onSetProject({ template });
	};

	return (
		<>
			{!isTemplatesView ? (
				<Modal
					closeIcon
					onClose={onModalClose}
					onOpen={() => setIsModalShown(true)}
					open={isModalShown}
					size={'tiny'}
					dimmer="inverted"
					trigger={<Button primary>Create project</Button>}
				>
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
								<Button color="grey" onClick={() => setIsTemplatesView(true)}>
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
							onClick={() => onCreateProject()}
							primary
						/>
					</Modal.Actions>
				</Modal>
			) : (
				<Modal
					closeIcon
					onClose={onModalClose}
					onOpen={() => setIsModalShown(true)}
					open={true}
					dimmer="inverted"
				>
					<Modal.Header>
						<h2 className={styles.modal__title}>Choose a classic template</h2>
						<p className={styles.modal__description}>{description}</p>
					</Modal.Header>
					<Modal.Content className={styles.cards_container}>
						{Object.entries(templatesInformation).map(([name, { image, description }]) => (
							<Card
								key={name}
								className={styles.card__container}
								image={<img src={image} className={styles.card__image} alt={name + ' image'} />}
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
				</Modal>
			)}
		</>
	);
};

export default CreateProjectModal;
