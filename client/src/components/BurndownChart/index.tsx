import React, { useEffect } from 'react';
import * as d3 from 'd3';
import * as _ from 'lodash';
import moment from 'moment';
import styles from './chart.module.scss';
import { getSortedCompletedIssues, getEndDate, getStartOfDayDate, appendLegend } from './helpers';

interface Props {
	sprint: WebApi.Entities.Sprint;
	issues: WebApi.Result.IssueResult[];
}

type ChartPoint = {
	storyPoint: number;
	date: Date;
};

type ActiveSprint = {
	startDate: Date;
	endDate: Date;
};

const BurndownChart: React.FC<Props> = ({ sprint, issues }) => {
	const { startDate, endDate } = sprint as ActiveSprint;

	const sortedCompletedIssues = getSortedCompletedIssues(issues);

	const start = getStartOfDayDate(startDate);
	const end = getEndDate(sortedCompletedIssues, endDate);

	const maxPoint = _.sumBy(issues, 'storyPoint');

	const guideLineData = [
		{
			storyPoint: maxPoint,
			date: start,
		},
		{
			storyPoint: 0,
			date: new Date(getStartOfDayDate(endDate)),
		},
	] as ChartPoint[];

	const datum = [
		{
			storyPoint: maxPoint,
			date: start,
		},
	] as ChartPoint[];

	sortedCompletedIssues
		.map((issue) => ({
			...issue,
			completedAt: getStartOfDayDate(issue['completedAt']),
		}))
		.forEach((issue) => {
			const prevPoint = datum[datum.length - 1];

			const nextPoint = {
				storyPoint: prevPoint.storyPoint - (issue.storyPoint || 0),
				date: issue.completedAt,
			};

			if (!moment(prevPoint.date).isSame(nextPoint.date)) {
				datum.push({
					storyPoint: prevPoint.storyPoint,
					date: issue.completedAt,
				});
			}
			datum.push(nextPoint);
		});

	const width = 1000;
	const height = 500;
	const adj = 5;
	const viewBox = '-' + adj + ' -' + adj + ' ' + (width + adj * 3) + ' ' + (height + adj * 3 + 100);

	const chart = () => {
		const xScale = d3.scaleTime().domain([start, end]).range([0, width]);
		const yScale = d3
			.scaleLinear()
			.domain([0, maxPoint + 2])
			.range([height, 0]);

		const days = d3.timeDay.range(start, end);
		const daysCount = days.length;

		let tickReducer = 1;
		if (daysCount > 20 && daysCount < 50) {
			tickReducer = 5;
		} else if (daysCount > 50 && daysCount < 100) {
			tickReducer = 10;
		} else if (daysCount > 100) {
			tickReducer = 20;
		}

		const storyPointTicks = days.length / tickReducer;
		const timeTicks = d3.timeDay.every(1 * tickReducer);

		const yaxis = d3.axisLeft(yScale).tickPadding(10).ticks(storyPointTicks).scale(yScale);
		const xaxis = d3
			.axisBottom(xScale)
			.ticks(timeTicks)
			.tickFormat(d3.timeFormat('%b %d') as any)
			.tickPadding(10)
			.scale(xScale);

		const line = d3
			.line()
			.defined((d: any) => !isNaN(d.storyPoint))
			.x((d: any) => xScale(d.date))
			.y((d: any) => yScale(d.storyPoint));

		const fontSize = 15;
		const translateRight = 70;
		const translateUp = 40;

		const svg = d3.select('.svg').attr('preserveAspectRatio', 'xMinYMin meet').classed('svg-content', true);

		svg.append('g')
			.attr('class', styles.axis)
			.attr('transform', `translate(${translateRight},${height + translateUp})`)
			.call(xaxis)
			.attr('class', styles.tick)
			.style('font-size', fontSize)

			.append('text')
			.attr('x', 0 + width / 2)
			.attr('y', 40)
			.attr('dy', '1em')
			.style('text-anchor', 'middle')
			.attr('fill', '#707070')
			.attr('font-size', fontSize)
			.attr('font-weight', 800)
			.text('TIME');

		svg.append('g')
			.attr('class', styles.axis)
			.attr('transform', `translate(${translateRight},${translateUp})`)
			.call(yaxis)
			.attr('class', styles.tick)

			.style('font-size', fontSize)

			.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', 0 - translateRight)
			.attr('x', 0 - height / 2)
			.attr('dy', '1em')
			.style('text-anchor', 'middle')
			.attr('fill', '#707070')
			.attr('font-size', fontSize)
			.attr('font-weight', 800)
			.text('STORY POINTS');

		svg.append('path')
			.datum(datum)
			.attr('transform', `translate(${translateRight},${translateUp})`)
			.attr('fill', 'none')
			.attr('stroke', 'red')
			.attr('stroke-width', 2)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('d', line as any);

		svg.append('path')
			.datum(guideLineData)
			.attr('transform', `translate(${translateRight},${translateUp})`)
			.attr('fill', 'none')
			.attr('stroke', '#336699')
			.attr('stroke-width', 2)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('d', line as any);

		svg.append('path')
			.datum([
				{ storyPoint: maxPoint + 2, date: start },
				{ storyPoint: maxPoint + 2, date: end },
			])
			.attr('transform', `translate(${translateRight},${translateUp})`)
			.attr('fill', 'none')
			.attr('stroke', '#707070')
			.attr('stroke-width', 1)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('d', line as any);
		svg.append('path')
			.datum([
				{ storyPoint: maxPoint + 2, date: end },
				{ storyPoint: 0, date: end },
			])
			.attr('transform', `translate(${translateRight},${translateUp})`)
			.attr('fill', 'none')
			.attr('stroke', '#707070')
			.attr('stroke-width', 1)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('d', line as any);

		// legend
		appendLegend(svg, width, translateRight, translateUp);
	};

	useEffect(() => {
		chart();
	});

	return <svg style={{ width, height }} className="svg" viewBox={viewBox} />;
};

export default BurndownChart;
