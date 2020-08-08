import { ItemProps } from './../../../components/common/Options/index';
interface Params {
	id: string;
	onOpenSettings: (id: string) => void;
	onTrash: (id: string) => void;
}

export const setProjectActions = ({ id, onOpenSettings, onTrash }: Params): ItemProps[] => [
	{
		id,
		text: 'Project settings',
		onClickAction: onOpenSettings,
	},
	{
		id,
		text: 'Move to trash',
		onClickAction: onTrash,
	},
];
