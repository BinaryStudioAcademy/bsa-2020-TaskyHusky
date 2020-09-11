import * as _ from 'lodash';
import moment from 'moment';

export type CompletedIssues = {
	id: string;
	summary?: string;
	storyPoint?: number;
	createdAt: Date;
	updatedAt: Date;
	completedAt: Date;
};

export const getSortedCompletedIssues = (issues: WebApi.Result.IssueResult[]) => {
	return _.orderBy(issues, 'completedAt')
		.filter(({ completedAt }) => completedAt)
		.map((issue) => ({ ...issue, completedAt: getStartOfDayDate(issue.completedAt as Date) })) as CompletedIssues[];
};

export const getEndDate = (issues: CompletedIssues[], sprintEnd: Date) => {
	if (issues.length !== 0) {
		const lastCompletedIssue = issues[issues.length - 1];

		const end =
			lastCompletedIssue.completedAt > new Date(sprintEnd)
				? lastCompletedIssue.completedAt
				: new Date(moment(new Date(sprintEnd)).startOf('day').format());
		return end;
	}
	return new Date(moment(new Date(sprintEnd)).startOf('day').format());
};

export const getStartOfDayDate = (date: Date) => {
	return new Date(moment(new Date(date)).startOf('day').format());
};

export const appendLegend = (
	svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
	width: number,
	translateRight: number,
	translateUp: number,
) => {
	svg.append('rect')
		.attr('x', width - 150 - 10)
		.attr('y', 5)
		.style('stroke', '#707070')
		.style('fill', 'none')
		.style('stroke-width', 1)
		.attr('width', 155)
		.attr('height', 55)
		.attr('transform', `translate(${translateRight},${translateUp})`);

	svg.append('rect')
		.attr('x', width - 150)
		.attr('y', 10 + 3)
		.attr('width', 14)
		.attr('height', 10)
		.style('fill', 'red')
		.attr('transform', `translate(${translateRight},${translateUp})`);

	svg.append('rect')
		.attr('x', width - 150)
		.attr('y', 35 + 4)
		.attr('width', 14)
		.attr('height', 10)
		.style('fill', '#336699')
		.attr('transform', `translate(${translateRight},${translateUp})`);

	svg.append('rect')
		.attr('x', width - 150 - 2)
		.attr('y', 10 + 1)
		.style('stroke', '#707070')
		.style('fill', 'none')
		.style('stroke-width', 1)
		.attr('width', 18)
		.attr('height', 14)
		.attr('transform', `translate(${translateRight},${translateUp})`);
	svg.append('rect')
		.attr('x', width - 150 - 2)
		.attr('y', 35 + 2)
		.style('stroke', '#707070')
		.style('fill', 'none')
		.style('stroke-width', 1)
		.attr('width', 18)
		.attr('height', 14)
		.attr('transform', `translate(${translateRight},${translateUp})`);

	svg.append('text')
		.attr('x', width - 150 + 20)
		.attr('y', 10 + 10)
		.text('Completed issues')
		.style('font-size', '14px')
		.attr('alignment-baseline', 'middle')
		.attr('transform', `translate(${translateRight},${translateUp})`);

	svg.append('text')
		.attr('x', width - 150 + 20)
		.attr('y', 35 + 10)
		.text('Guide line')
		.style('font-size', '14px')
		.attr('alignment-baseline', 'middle')
		.attr('transform', `translate(${translateRight},${translateUp})`);
};
