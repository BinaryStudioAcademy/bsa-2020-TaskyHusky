import _ from 'lodash';
import { getDiffPropNames } from '../helpers/objectsDiff.helper';
import { Dictionary } from '../../typing/Dictionary';
import { templatedReplace } from '../helpers/templatedReplace.helper';
import { asSentence, camelCaseToWords } from '../helpers/sentence.helper';
import { PartialIssue } from '../models/Issue';

const TEMPLATE = 'Issue {issueKey} was updated. {fields} {were/was} changed.';

export const chooseMessage = (oldIssue: PartialIssue, newIssue: PartialIssue): string => {
	const difference = getDiffPropNames<any, any>(oldIssue, newIssue, _.isEqual);

	const isWas = difference.length === 1;
	const fieldsPart0 = asSentence(difference.slice(0, difference.length - (isWas ? 0 : 1)).join(', '));
	const fieldsPart1 = isWas ? '' : ` and ${camelCaseToWords(difference[difference.length - 1])}`;

	const replaceRules: Dictionary<string> = {
		issueKey: newIssue.issueKey as string,
		'were/was': `w${isWas ? 'as' : 'ere'}`,
		fields: fieldsPart0 + fieldsPart1,
	};

	return templatedReplace(TEMPLATE, replaceRules);
};
