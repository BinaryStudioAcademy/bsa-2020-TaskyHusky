export const getNextDate = (duration: number | 'custom', startDate: Date) => {
	const nextDate = new Date(
		startDate.getFullYear(),
		startDate.getMonth(),
		startDate.getDate() + 7 * (duration === 'custom' ? 1 : duration),
		startDate.getHours(),
		startDate.getMinutes() + 15,
	);
	return nextDate;
};
