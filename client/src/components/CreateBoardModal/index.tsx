import React from 'react';
import { Modal, Button, Form, Checkbox, Image } from 'semantic-ui-react';

import scrumImg from './../../assets/images/scrum.svg';
import styles from './styles.module.scss';

interface Props {
	setIsModalShown(params: boolean): void;
	onCreateProject(): void;
}

const CreateBoardModal = (props: Props) => {
	const { setIsModalShown, onCreateProject } = props;
	return (
		<Modal
			closeIcon
			onClose={() => setIsModalShown(false)}
			onOpen={() => setIsModalShown(true)}
			open={true}
			size={'tiny'}
			dimmer="inverted"
		>
			<Modal.Header>Create project</Modal.Header>
			<Modal.Content>
				<Form className={styles.form_container}>
					<Form.Field>
						<label>Name</label>
						<input placeholder="Enter a project name" />
					</Form.Field>
					<Form.Field>
						<label>Key</label>
						<input placeholder="Enter a key" />
					</Form.Field>
					<Form.Field>
						<Checkbox label="Share settings with an existing project" disabled={true} />
					</Form.Field>
				</Form>
				<p>Template</p>
				<div className={styles.flex_container}>
					<Image src={scrumImg} className={styles.template_image} />
					<div>
						<h2>Scrum</h2>
						<p>
							Manage stories, tasks, and workflows for a scrum team ◦ For teams that deliver work on a
							regular schedule
						</p>
						<Button color="grey">Change template</Button>
					</div>
				</div>
			</Modal.Content>
			<Modal.Actions>
				<Button color="grey" onClick={() => setIsModalShown(false)}>
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
	);
};

export default CreateBoardModal;
