import React, { useState } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';

export type ItemProps = {
	id: string;
	text: string;
	onClickAction: (id: string) => void;
};

export interface OptionsProps {
	config: ItemProps[];
}

const Options = ({ config }: OptionsProps) => {
	const [isOpened, setIsOpened] = useState(false);
	return (
		<Dropdown
			onOpen={() => setIsOpened(true)}
			onClose={() => setIsOpened(false)}
			as="span"
			icon={<Icon name="ellipsis horizontal" />}
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
