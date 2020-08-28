import multer from 'multer';
import { Handler } from 'express';
import { fileSize } from '../../config/aws.config';
import { fromBuffer } from 'file-type';
import { allowedIssueAttchmentUploadFileTypes } from '../../config/multer.config';
import HttpStatusCode from '../constants/httpStattusCode.constants';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import { validateFileType } from '../helpers/validateFileType';

const storage = multer.memoryStorage();

const upload = multer({
	storage,
	limits: {
		fileSize,
	},
});

export const uploadIssueAttachment = upload.single('file');

export const validateIssueAttachment: Handler = async (req, res, next) => {
	const {
		file: { buffer, originalname },
	} = req;
	const type = await fromBuffer(buffer);

	if (
		!validateFileType({
			mime: type?.mime,
			name: originalname,
			allow: allowedIssueAttchmentUploadFileTypes,
		})
	) {
		next(new ErrorResponse(HttpStatusCode.BAD_REQUEST, `Disallowed file mime type.`));
	}

	next();
};
