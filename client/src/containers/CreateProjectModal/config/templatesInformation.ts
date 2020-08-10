import i18n from 'i18next';

import kanbanImg from 'assets/images/kanban.svg';
import scrumImg from 'assets/images/scrum.svg';
import bugTrackingImg from 'assets/images/bug_tracking.svg';

export interface TemplatesInformation {
	[key: string]: {
		description: string;
		image: string;
	};
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
	'Bug tracking': {
		description: i18n.t('bug_tracking_description'),
		image: bugTrackingImg,
	},
});

export default getTemplatesInformation;
