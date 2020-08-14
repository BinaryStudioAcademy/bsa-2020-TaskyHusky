import i18n from 'i18next';

import kanbanImg from 'assets/images/kanban.svg';
import scrumImg from 'assets/images/scrum.svg';

export interface MethodologyInfo {
	description: string;
	image: string;
}

export interface TemplatesInformation {
	[WebApi.Board.BoardType.Kanban]: MethodologyInfo;
	[WebApi.Board.BoardType.Scrum]: MethodologyInfo;
}

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
