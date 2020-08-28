export const generateExtnameRegex = (extname: string): RegExp => {
	return new RegExp(`^[^\.]+\.${extname}$`);
};
