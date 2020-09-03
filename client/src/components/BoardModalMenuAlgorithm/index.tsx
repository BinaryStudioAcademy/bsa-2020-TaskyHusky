import { Form, Radio } from 'semantic-ui-react';
import { creatingAlgorithms } from '../../typings/boardTypes';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
	algorithm: creatingAlgorithms;

	onRadioChange: (algorithmType: creatingAlgorithms) => void;
}

const BoardModalMenuAlgorithm = (props: Props) => {
	const { algorithm, onRadioChange } = props;
	const { t } = useTranslation();

	return (
		<Form>
			<Form.Field>
				<Radio
					disabled
					checked={algorithm === creatingAlgorithms.newProject}
					label={t('board_created_with_new_software_project')}
					name={creatingAlgorithms.newProject}
					value={creatingAlgorithms.newProject}
					onChange={() => onRadioChange(creatingAlgorithms.newProject)}
				/>
			</Form.Field>
			<Form.Field>
				<Radio
					checked={algorithm === creatingAlgorithms.existingProject}
					label={t('board_from_an_existing_project')}
					name={creatingAlgorithms.existingProject}
					value={creatingAlgorithms.existingProject}
					onChange={() => onRadioChange(creatingAlgorithms.existingProject)}
				/>
			</Form.Field>
			<Form.Field>
				<Radio
					disabled
					checked={algorithm === creatingAlgorithms.savedFilter}
					label={t('board_from_an_existing_saved_filter')}
					name={creatingAlgorithms.savedFilter}
					value={creatingAlgorithms.savedFilter}
					onChange={() => onRadioChange(creatingAlgorithms.savedFilter)}
				/>
			</Form.Field>
		</Form>
	);
};

export default BoardModalMenuAlgorithm;
