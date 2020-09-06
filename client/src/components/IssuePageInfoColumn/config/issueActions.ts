import i18next from 'i18next';
import { ConfigItem } from 'components/common/Options';

interface Props {
	id: string;
	onUpdate: (id: string) => void;
	onDelete: (id: string) => void;
}

export const setIssueActions = ({ id, onDelete, onUpdate }: Props): ConfigItem[] => [
	{
		id,
		text: i18next.t('edit_issue'),
		onClickAction: onUpdate,
	},
	{
		id,
		text: i18next.t('delete'),
		onClickAction: onDelete,
	},
];
