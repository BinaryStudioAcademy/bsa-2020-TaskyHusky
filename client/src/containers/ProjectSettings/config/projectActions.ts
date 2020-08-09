import { ItemProps } from './../../../components/common/Options/index';

interface Params {
	id: string;
	onTrash: (id: string) => void;
}

export const setProjectActions = ({ id, onTrash }: Params): ItemProps[] => [
	{
		id,
		text: 'Move to trash',
		onClickAction: onTrash,
	},
];
