import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';
import {getMessages} from '../services/git.service';

class TeammatesController {
	getCommits = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
		const { message } = req.params;

		try {
			const messages= await getMessages(message);
			res.send(messages);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	};


}

export default TeammatesController;
