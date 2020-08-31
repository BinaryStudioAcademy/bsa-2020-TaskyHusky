import i18n from 'i18next';

import kanbanImg from 'assets/images/kanban.svg';
import scrumImg from 'assets/images/scrum.svg';

export interface MethodologyInfo {
	description: string;
	image: string;
	whyHeader: string;
	whyItems: string[];
	readMoreLink: string;
}

export interface TemplatesInformation {
	[WebApi.Board.BoardType.Kanban]: MethodologyInfo;
	[WebApi.Board.BoardType.Scrum]: MethodologyInfo;
}

const getTemplatesInformation = (): TemplatesInformation => ({
	Kanban: {
		description: i18n.t('kanban_description'),
		image: kanbanImg,
		whyHeader: i18n.t('choose_kanban'),
		whyItems: [
			i18n.t('choose_kanban_item_1'),
			i18n.t('choose_kanban_item_2'),
			i18n.t('choose_kanban_item_3'),
			i18n.t('choose_kanban_item_4'),
		],
		readMoreLink: 'https://kanbanize.com/blog/why-use-kanban-infographic/',
	},
	Scrum: {
		description: i18n.t('scrum_description'),
		image: scrumImg,
		whyHeader: i18n.t('choose_scrum'),
		whyItems: [
			i18n.t('choose_scrum_item_1'),
			i18n.t('choose_scrum_item_2'),
			i18n.t('choose_scrum_item_3'),
			i18n.t('choose_scrum_item_4'),
		],
		readMoreLink: 'https://invidgroup.com/4-reasons-to-use-scrum-in-software-development/',
	},
});

export default getTemplatesInformation;
