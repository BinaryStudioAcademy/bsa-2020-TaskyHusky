import { confirmHeader, confirmText } from 'components/common/Options/const/ProjectsModalsContent';
import i18n from 'i18next';
import { ConfigItem } from 'components/common/Options/index';

interface Params {
	id: string;
	onOpenSettings: (id: string) => void;
	onTrash: (id: string) => void;
}

export const setProjectActions = ({ id, onOpenSettings, onTrash }: Params): ConfigItem[] => [
	{
		id,
		text: i18n.t('project_settings'),
		onClickAction: onOpenSettings,
	},
	{
		id,
		text: i18n.t('move_to_trash'),
		onClickAction: onTrash,
		withConfirmation: true,
		confirmHeader,
		confirmText,
	},
];
