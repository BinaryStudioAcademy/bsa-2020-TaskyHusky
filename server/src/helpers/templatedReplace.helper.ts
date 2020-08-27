import { Dictionary } from '../../typing/Dictionary';

export const templatedReplace = (template: string, rules: Dictionary<string>): string => {
	return template.replace(/\{[a-z0-9/]+\}/gi, (substr) => rules[substr.slice(1, -1)]);
};
