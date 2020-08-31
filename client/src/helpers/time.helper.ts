const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

function getTimeString(time: Date) {
	const hours = `${time.getHours() > 9 ? '' : 0}${time.getHours()}`;
	const minutes = `${time.getMinutes() > 9 ? '' : 0}${time.getMinutes()}`;

	return `${hours}:${minutes}`;
}

function isToday(date: Date) {
	const dateNow = new Date();
	return dateNow.getDate() === date.getDate() && dateNow.getTime() - date.getTime() < MILLISECONDS_IN_DAY;
}

function isYesterday(date: Date) {
	const dateNow = new Date(Date.now() - MILLISECONDS_IN_DAY);
	return dateNow.getDate() === date.getDate() && dateNow.getTime() - date.getTime() < MILLISECONDS_IN_DAY;
}

function getDayName(date: Date) {
	if (isToday(date)) {
		return 'Today';
	}
	if (isYesterday(date)) {
		return 'Yesterday';
	}
	return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`;
}

export function getDateString(date: Date) {
	return `${getDayName(date)} at ${getTimeString(date)}`;
}
