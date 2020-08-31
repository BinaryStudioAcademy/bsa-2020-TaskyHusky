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
		whyHeader: 'Choose Kanban if you want to:',
		whyItems: [
			'increase productivity and efficiency',
			'have flexibility in production',
			'limit work in progress',
			'avoid multitasking',
		],
		readMoreLink: 'https://kanbanize.com/blog/why-use-kanban-infographic/',
	},
	Scrum: {
		description: i18n.t('scrum_description'),
		image: scrumImg,
		whyHeader: 'Choose Scrum if you want to:',
		whyItems: [
			'provide flexibility when requirements change',
			'estimate the amount of work to do',
			'build the product by increments',
			'save time and money',
		],
		readMoreLink: 'https://invidgroup.com/4-reasons-to-use-scrum-in-software-development/',
	},
});

export default getTemplatesInformation;
