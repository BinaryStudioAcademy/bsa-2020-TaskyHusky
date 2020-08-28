import multer from 'multer';
import { Handler } from 'express';
import { fromBuffer } from 'file-type';
import { fileSize } from '../../config/aws.config';
import { allowedImageUploadMimeTypes, allowedIssueAttchmentUploadFileTypes } from '../../config/multer.config';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';
import { validateFileType } from '../helpers/validateFileType';

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

	if (
		!validateFileType({
			name: req.file.originalname,
			mime: fileType?.mime,
			allow: allowedIssueAttchmentUploadFileTypes,
		})
	) {
		next(new ErrorResponse(HttpStatusCode.BAD_REQUEST, 'Disallowed file mime type.'));
	}

	next();
};
