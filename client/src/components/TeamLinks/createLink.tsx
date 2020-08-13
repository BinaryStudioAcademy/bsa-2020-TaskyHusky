import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { CurrentLink } from './index';

type Props = {
	onClose: () => void;
	onConfirm: (arg: CurrentLink) => void;
	currentLink?: CurrentLink;
};

const CreateLink = ({ onClose, currentLink, onConfirm }: Props) => {
	const [newLink, setnewLink] = useState(
		currentLink || {
			http: '',
			name: '',
			description: '',
		},
	);
	const onChange = (e: React.BaseSyntheticEvent) => {
		setnewLink({
			...newLink,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<Modal onClose={onClose} open size="tiny">
			<Modal.Header>Add link</Modal.Header>
			<Modal.Content>
				<Form size="big">
					<Form.Field>
						<label>Web-address</label>
						<input
							value={newLink.http}
							onChange={(e) => onChange(e)}
							placeholder="For example: http://google.com"
							name="http"
						/>
					</Form.Field>
					<Form.Field>
						<label>Title</label>
						<input
							value={newLink.name}
							onChange={(e) => onChange(e)}
							placeholder="For example: My first project"
							name="name"
						/>
					</Form.Field>
					<Form.Field>
						<label>Small description</label>
						<textarea
							name="description"
							onChange={(e) => onChange(e)}
							defaultValue={newLink.description}
							placeholder="Add small specification and other members of you team will know, why it's important"
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button
					content="Accept"
					primary
					labelPosition="left"
					icon="checkmark"
					onClick={() => onConfirm(newLink)}
				/>
				<Button color="grey" onClick={onClose}>
					Cancel
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default CreateLink;
