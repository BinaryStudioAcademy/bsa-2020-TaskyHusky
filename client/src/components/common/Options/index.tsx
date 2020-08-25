import React, { useState } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

import styles from './styles.module.scss';
import ConfirmModal from '../ConfirmModal';

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
	const [item, setItem] = useState<ConfigItem>({
		id: '',
		text: '',
		onClickAction: () => {},
	});

	const addConfirmation = (item: ConfigItem) => {
		setIsConfirmModalOpen(true);
		setItem(item);
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
								onClick={
									it.withConfirmation ? () => addConfirmation(it) : () => it.onClickAction(it.id)
								}
								content={
									<>
										<span>{it.text}</span>
									</>
								}
							/>
						))}
					</Dropdown.Menu>
				) : null}
			</Dropdown>
			<ConfirmModal
				isOpened={isConfirmModalOpen}
				setIsOpened={setIsConfirmModalOpen}
				confirmAction={() => item.onClickAction(item.id)}
				header={item.confirmHeader}
				content={item.confirmText}
			/>
		</>
	);
};

export default Options;
