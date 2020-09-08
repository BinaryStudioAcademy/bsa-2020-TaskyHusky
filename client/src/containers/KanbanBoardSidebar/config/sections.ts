import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

export enum SectionType {
	settings = 'settings',
	issues = 'issues',
	board = 'board',
}

export interface ConfigItem {
	icon: SemanticICONS;
	type: SectionType;
	defaultActive?: boolean;
}

export type Config = ConfigItem[];

const sections: Config = [
	{
		icon: 'setting',
		type: SectionType.settings,
	},
	{
		icon: 'flipboard',
		type: SectionType.board,
		defaultActive: true,
	},
	{
		icon: 'clipboard check',
		type: SectionType.issues,
	},
];

export default sections;
