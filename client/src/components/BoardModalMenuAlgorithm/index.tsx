import { Form, Radio } from 'semantic-ui-react';
import { creatingAlgorithms } from '../../typings/boardTypes';
import React from 'react';

interface Props {
	algorithm: creatingAlgorithms;

	onRadioChange: (algorithmType: creatingAlgorithms) => void;
}

const BoardModalMenuAlgorithm = (props: Props) => {
	const { algorithm, onRadioChange } = props;

	return (
		<Form>
			<Form.Field>
				<Radio
					disabled
					checked={algorithm === creatingAlgorithms.newProject}
					label="Board created with new Software project"
					name={creatingAlgorithms.newProject}
					value={creatingAlgorithms.newProject}
					onChange={() => onRadioChange(creatingAlgorithms.newProject)}
				/>
			</Form.Field>
			<Form.Field>
				<Radio
					checked={algorithm === creatingAlgorithms.existingProject}
					label="Board from an existing project"
					name={creatingAlgorithms.existingProject}
					value={creatingAlgorithms.existingProject}
					onChange={() => onRadioChange(creatingAlgorithms.existingProject)}
				/>
			</Form.Field>
			<Form.Field>
				<Radio
					disabled
					checked={algorithm === creatingAlgorithms.savedFilter}
					label="Board from an existing Saved Filter"
					name={creatingAlgorithms.savedFilter}
					value={creatingAlgorithms.savedFilter}
					onChange={() => onRadioChange(creatingAlgorithms.savedFilter)}
				/>
			</Form.Field>
		</Form>
	);
};

export default BoardModalMenuAlgorithm;
