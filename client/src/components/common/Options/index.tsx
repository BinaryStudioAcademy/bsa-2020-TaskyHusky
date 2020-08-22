import React, { useState } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

import styles from './styles.module.scss';
import { ConfirmModal } from '../ConfirmModal';

export type ConfigItem = {
	id: string;
	text: string;
	onClickAction: (id: string) => void;
	withConfirmation?: boolean;
	confirmText?: string;
	confirmHeader?: string;
};

export interface Params {
	config: ConfigItem[];
	isBackgroundShown?: boolean;
}

const Options = ({ config, isBackgroundShown = true }: Params) => {
	const [isOpened, setIsOpened] = useState(false);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

	const addConfirmation = () => {
		setIsConfirmModalOpen(true);
	};

	return (
		<>
			<Dropdown
				onOpen={() => setIsOpened(true)}
				onClose={() => setIsOpened(false)}
				direction="left"
				as="span"
				icon={
					<Icon
						name="ellipsis horizontal"
						className={isBackgroundShown ? (isOpened ? styles.opened : styles.closed) : ''}
					/>
				}
			>
				{isOpened || isConfirmModalOpen ? (
					<Dropdown.Menu as="span">
						{config.map((it) => (
							<Dropdown.Item
								key={it.text}
								as="span"
								text={it.text}
								onClick={it.withConfirmation ? () => addConfirmation() : () => it.onClickAction(it.id)}
								content={
									<>
										<span>{it.text}</span>
										<ConfirmModal
											isOpened={isConfirmModalOpen}
											setIsOpened={setIsConfirmModalOpen}
											confirmAction={() => it.onClickAction(it.id)}
											header={it.confirmHeader || ''}
											content={it.confirmText || ''}
										/>
									</>
								}
							/>
						))}
					</Dropdown.Menu>
				) : null}
			</Dropdown>
		</>
	);
};

export default Options;
