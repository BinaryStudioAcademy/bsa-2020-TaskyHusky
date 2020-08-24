import multer from 'multer';
import { Handler } from 'express';
import { fromBuffer } from 'file-type';
import { fileSize } from '../../config/aws.config';
import { allowedImageUploadMimeTypes } from '../../config/multer.config';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';

const storage = multer.memoryStorage();

const upload = multer({
	storage,
	limits: {
		fileSize,
	},
});

export const uploadImage = upload.single('image');

export const validateImage: Handler = async (req, res, next) => {
	const fileType = await fromBuffer(req.file.buffer);

	if (!fileType || !allowedImageUploadMimeTypes.includes(fileType.mime)) {
		next(
			new ErrorResponse(
				HttpStatusCode.BAD_REQUEST,
				`Disallowed file mime type: ${fileType ? fileType.mime : 'text file'}`,
			),
		);
	}

	next();
};
