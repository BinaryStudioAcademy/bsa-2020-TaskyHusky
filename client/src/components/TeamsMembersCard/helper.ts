export const getBgColor = (): { [key: string]: string } => {
	const colors: string[] = ['goldenrod', 'red', 'green', 'orange', 'brown', 'darkviolet', 'chocolate'];
	const randomNum: number = Math.round(Math.random() * 6);
	return { backgroundColor: colors[randomNum] };
};
