export const getBgColor = (): string => {
	const colors: string[] = ['goldenrod', 'red', 'green', 'orange', 'brown', 'darkviolet', 'chocolate'];
	const randomNum: number = Math.round(Math.random() * 6);
	return colors[randomNum];
};
