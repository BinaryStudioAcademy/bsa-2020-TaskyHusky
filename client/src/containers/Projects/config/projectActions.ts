import i18n from 'i18next';

import { ItemProps } from './../../../components/common/Options/index';
interface Params {
	id: string;
	onOpenSettings: (id: string) => void;
}

export const setProjectActions = ({ id, onOpenSettings }: Params): ItemProps[] => [
	{
		id,
		text: i18n.t('project_settings'),
		onClickAction: onOpenSettings,
	},
];
