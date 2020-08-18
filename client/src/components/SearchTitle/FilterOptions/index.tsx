import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { openModal } from 'containers/SaveFilterModal/logic/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import styles from './styles.module.scss';
import { resetState } from 'containers/AdvancedSearch/logic/actions';

const Options = () => {
	const [isOpened, setIsOpened] = useState(false);
	const dispatch = useDispatch();

	const { filterId } = useParams();

	const onSaveAs = () => {
		dispatch(openModal());
	};
	const onDiscard = () => {
		dispatch(resetState({ id: filterId }));
	};
	return (
		<Dropdown
			onOpen={() => setIsOpened(true)}
			onClose={() => setIsOpened(false)}
			direction="left"
			button
			compact
			icon="angle down"
			className={styles.dropdownTrigger}
		>
			{isOpened ? (
				<Dropdown.Menu as="span">
					<Dropdown.Item key="save-as-action" as="span" text="Save as" onClick={onSaveAs} />
					<Dropdown.Item key="discard-changes-action" as="span" text="Discard changes" onClick={onDiscard} />
				</Dropdown.Menu>
			) : null}
		</Dropdown>
	);
};

export default Options;
