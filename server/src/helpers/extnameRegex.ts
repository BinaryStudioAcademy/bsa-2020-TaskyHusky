export const generateExtnameRegex = (extname: string): RegExp => {
	// eslint-disable-next-line no-useless-escape
	return new RegExp(`^[^\.]+\.${extname}$`);
};
