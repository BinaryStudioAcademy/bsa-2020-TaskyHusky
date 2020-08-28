export const isImage = (fName: string) => {
	const extname = fName.slice(fName.lastIndexOf('.'));
	const imageExtames = ['.png', '.jpg', '.bmp', '.jpeg'];
	return imageExtames.includes(extname);
};
