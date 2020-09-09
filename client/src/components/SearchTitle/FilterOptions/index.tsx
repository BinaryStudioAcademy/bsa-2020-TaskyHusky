import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { openModal } from 'containers/SaveFilterModal/logic/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import styles from './styles.module.scss';
import { resetState } from 'containers/AdvancedSearch/logic/actions';
import { useTranslation } from 'react-i18next';
import { updateFilter } from 'containers/AdvancedSearch/logic/actions';

interface Props {
	isEdited: boolean;
}

const Options = ({ isEdited }: Props) => {
	const [isOpened, setIsOpened] = useState(false);
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const { filterId } = useParams();

	const onSaveAs = () => {
		dispatch(openModal());
	};
	const onDiscard = () => {
		dispatch(resetState({ id: filterId }));
	};
	const onSave = () => {
		dispatch(updateFilter());
	};
	return (
		<Dropdown
			onOpen={() => setIsOpened(true)}
			onClose={() => setIsOpened(false)}
			direction="left"
			button
			compact
			icon="ellipsis horizontal"
			className={styles.dropdownTrigger}
		>
			{isOpened ? (
				<Dropdown.Menu as="span">
					{isEdited && <Dropdown.Item key="save-action" as="span" text={t('save')} onClick={onSave} />}
					<Dropdown.Item key="save-as-action" as="span" text={t('save_as')} onClick={onSaveAs} />
					{isEdited && (
						<Dropdown.Item
							key="discard-changes-action"
							as="span"
							text="Discard changes"
							onClick={onDiscard}
						/>
					)}
				</Dropdown.Menu>
			) : null}
		</Dropdown>
	);
};

export default Options;
