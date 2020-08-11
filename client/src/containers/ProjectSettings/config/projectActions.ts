import i18n from 'i18next';
import { ItemProps } from './../../../components/common/Options/index';

interface Params {
	id: string;
	onTrash: (id: string) => void;
}

export const setProjectActions = ({ id, onTrash }: Params): ItemProps[] => [
	{
		id,
		text: i18n.t('move_to_trash'),
		onClickAction: onTrash,
	},
];
