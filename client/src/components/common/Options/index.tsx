import React, { useState } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

import styles from './styles.module.scss';

export type ItemProps = {
	id: string;
	text: string;
	onClickAction: (id: string) => void;
};

export interface Params {
	config: ItemProps[];
	isBackgroundShown?: boolean;
}

const Options = ({ config, isBackgroundShown = true }: Params) => {
	const [isOpened, setIsOpened] = useState(false);
	return (
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
			{isOpened ? (
				<Dropdown.Menu as="span">
					{config.map(({ id, text, onClickAction }) => (
						<Dropdown.Item key={text} as="span" text={text} onClick={() => onClickAction(id)} />
					))}
				</Dropdown.Menu>
			) : null}
		</Dropdown>
	);
};

export default Options;
