import React, { useState } from 'react';
import { cloneDeep } from 'lodash-es';
import Options, { Params as OptionsParams, ItemProps } from 'components/common/Options';
import { ConfirmModal } from 'components/common/ConfirmModal';

const OptionsWithConfirmation = ({ config }: OptionsParams) => {
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
	const [trashedId, setTrashedId] = useState<string>('');
	const [initialConfig] = useState(cloneDeep(config));
	let configWithConfirmation = config;

	const onConfirm = (): void => {
		const trashConfig = initialConfig.find((item) => item.onClickAction.name === 'onTrash');
		// eslint-disable-next-line no-unused-expressions
		trashConfig?.onClickAction(trashedId);
		setIsConfirmModalOpen(false);
	};

	const onTrash = (id: string): void => {
		setTrashedId(id);
		setIsConfirmModalOpen(true);
	};

	if (trashedId === '') {
		const withConfirm = configWithConfirmation.map((item: ItemProps) => {
			if (item.onClickAction.name === 'onTrash') {
				item.onClickAction = onTrash;
			}
			return item;
		});

		configWithConfirmation = withConfirm;
	}

	return (
		<div>
			<Options config={configWithConfirmation} />
			<ConfirmModal
				isOpened={isConfirmModalOpen}
				setIsOpened={setIsConfirmModalOpen}
				confirmAction={onConfirm}
				header="Move to trash?"
				content="Only Tasky Husky admins can restore the project from the trash"
			/>
		</div>
	);
};

export default OptionsWithConfirmation;
