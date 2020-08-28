import { IMAGE_EXTNAMES } from 'constants/FileType';

export const isImage = (fName: string) => {
	const extname = fName.slice(fName.lastIndexOf('.'));
	return IMAGE_EXTNAMES.includes(extname);
};
