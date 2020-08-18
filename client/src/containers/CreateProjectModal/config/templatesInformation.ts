import { Template } from './../index';
import i18n from 'i18next';

import kanbanImg from 'assets/images/kanban.svg';
import scrumImg from 'assets/images/scrum.svg';

export type MethodologyInfo = {
	description: string;
	image: string;
};

export type TemplatesInformation = {
	[key in Template]: MethodologyInfo;
};

const getTemplatesInformation = (): TemplatesInformation => ({
	Kanban: {
		description: i18n.t('kanban_description'),
		image: kanbanImg,
	},
	Scrum: {
		description: i18n.t('scrum_description'),
		image: scrumImg,
	},
});

export default getTemplatesInformation;
