import React, { useEffect } from 'react';
// import styles from './styles.module.scss';
import * as d3 from 'd3';
import * as _ from 'lodash';
import moment from 'moment';

interface Props {
	sprint: WebApi.Entities.Sprint;
}

type ChartPoint = {
	storyPoint: number;
	date: Date;
};

// const issues = [
// 	{ storyPoint: undefined, completedAt: new Date(2020, 1, 2) },
// 	{ storyPoint: 10, completedAt: new Date(2020, 1, 1) },
// 	{ storyPoint: 5, completedAt: new Date(2020, 1, 4) },
// 	{ completedAt: new Date(2020, 1, 4) },
// 	{ storyPoint: 5, completedAt: new Date(2020, 1, 4) },
// 	{ storyPoint: 5, completedAt: new Date(2020, 1, 4) },
// 	{ storyPoint: 15, completedAt: new Date(2020, 1, 8) },
// 	{ storyPoint: 5, completedAt: new Date(2020, 1, 8) },
// 	{ storyPoint: 10, completedAt: new Date(2020, 1, 12) },
// ];

const BurndownChart: React.FC<Props> = ({ sprint }) => {
	const { startDate, endDate, issues } = sprint;
	const sortedIssuesByDate = _.orderBy(issues, 'completedAt').filter(({ completedAt }) => completedAt);

	const lastCompletedIssue = sortedIssuesByDate[sortedIssuesByDate.length - 1];

	const start = new Date(
		moment(new Date(startDate as Date))
			.startOf('day')
			.format(),
	);
	const end =
		(lastCompletedIssue.completedAt as Date) > new Date(endDate as Date)
			? (lastCompletedIssue.completedAt as Date)
			: new Date(
					moment(new Date(endDate as Date))
						.startOf('day')
						.format(),
			  );

	const maxPoint = _.sumBy(issues, 'storyPoint');

	const datum = [
		{
			storyPoint: maxPoint,
			date: start,
		},
	] as ChartPoint[];

	sortedIssuesByDate
		.map((issue) => ({
			...issue,
			completedAt: new Date(
				moment(new Date(issue['completedAt'] as Date))
					.startOf('day')
					.format(),
			),
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

	const width = 960;
	const height = 500;
	const margin = 5;
	const padding = 5;
	const adj = 30;
	const viewBox = '-' + adj + ' -' + adj + ' ' + (width + adj * 3) + ' ' + (height + adj * 3);

	const chart = () => {
		const xScale = d3.scaleTime().domain([start, end]).range([0, width]);
		const yScale = d3.scaleLinear().domain([0, maxPoint]).range([height, 0]);

		const storyPointTicks = issues.length;
		const timeTicks = d3.timeDay.every(1);

		const yaxis = d3.axisLeft(yScale).ticks(storyPointTicks).scale(yScale);
		const xaxis = d3
			.axisBottom(xScale)
			.ticks(timeTicks)
			.tickFormat(d3.timeFormat('%b %d') as any)
			.scale(xScale);

		const days = d3.timeDay.range(start, new Date(endDate as Date));
		const weekdaysCount = days.reduce(
			(count, date) => (moment(date).weekday() === 6 || moment(date).weekday() === 0 ? count + 1 : count),
			0,
		);

		const allDays = days.length;

		const reduceStoryPointPerDay = Math.round(maxPoint / (allDays - weekdaysCount));
		const guideLineData = [
			{
				storyPoint: maxPoint,
				date: start,
			},
		] as ChartPoint[];

		days.forEach((day, index) => {
			const weekday = moment(day).weekday();

			const prevPoint = guideLineData[guideLineData.length - 1];

			if (weekday === 6 || weekday === 0) {
				guideLineData.push({
					storyPoint: prevPoint.storyPoint,
					date: day,
				});
				return;
			}
			if (days.length - 1 === index) {
				guideLineData.push({
					storyPoint: 0,
					date: day,
				});
				return;
			}
			guideLineData.push({
				storyPoint: Math.floor(prevPoint.storyPoint - reduceStoryPointPerDay),
				date: day,
			});
		});

		const svg = d3.select('.svg').attr('preserveAspectRatio', 'xMinYMin meet').classed('svg-content', true);
		svg.append('g')
			.attr('class', 'axis')
			// .attr('transform', 'translate(' + 70 + ',' + height + ')')
			.attr('transform', 'translate(' + 0 + ',' + height + ')')
			.call(xaxis)
			.style('font-size', 12);
		svg.append('g')
			.attr('class', 'axis')
			// .attr('transform', 'translate(70)')
			.call(yaxis)
			.style('font-size', 12)
			.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', 0 - 50)
			.attr('x', 0 - height / 2)
			.attr('dy', '1em')
			.style('text-anchor', 'middle')
			.attr('fill', 'red')
			.text('Value');
		const line = d3
			.line()
			.defined((d: any) => !isNaN(d.storyPoint))
			.x((d: any) => xScale(d.date))
			.y((d: any) => yScale(d.storyPoint));
		svg.append('path')
			.datum(datum)
			.attr('fill', 'none')
			.attr('stroke', 'red')
			.attr('stroke-width', 0.8)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('d', line as any);
		svg.append('path')
			.datum(guideLineData)
			.attr('fill', 'none')
			.attr('stroke', 'grey')
			.attr('stroke-width', 3.8)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('d', line as any);
	};

	useEffect(() => {
		chart();
	});

	return <svg style={{ width, height, padding, margin }} className="svg" viewBox={viewBox} />;
};

export default BurndownChart;
