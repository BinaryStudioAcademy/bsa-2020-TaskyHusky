import React from 'react';
import { Button, Modal, Input, Form } from 'semantic-ui-react';

type Props = {
	onClose: any;
};

const CreateLink = ({ onClose }: Props) => {
	return (
		<Modal onClose={onClose} open size="tiny">
			<Modal.Header>Add teammates</Modal.Header>
			<Modal.Content>
				<Form size="big">
					<Form.Field>
						<label>Web-address</label>
						<input placeholder="For example: http://google.com" />
					</Form.Field>
					<Form.Field>
						<label>Title</label>
						<input placeholder="For example: My first project" />
					</Form.Field>
					<Form.Field>
						<label>Small description</label>
						<textarea placeholder="Add small specification and other members of you team will know, why it's important" />
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button
					content="Accept"
					primary
					labelPosition="left"
					icon="checkmark"
					onClick={() => 'onClose(false)'}
				/>
				<Button color="grey" onClick={onClose}>
					Cancel
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default CreateLink;
