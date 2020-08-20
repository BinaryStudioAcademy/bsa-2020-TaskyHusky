import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import {TeammatesRepository} from '../repositories/teammates.repository';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';
import { UserProfile } from '../entity/UserProfile';

class TeammatesController {
	getIncomingInvitation = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
		const teammatesRepository = getCustomRepository(TeammatesRepository);
		const { id } = req.params;

		try {
			const invitations = await teammatesRepository.getIncomingInvitations(id);
			res.send(invitations);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	};

	getPendingInvitation = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
		const teammatesRepository = getCustomRepository(TeammatesRepository);
		const { id } = req.params;

		try {
			const invitations = await teammatesRepository.getPendingInvitations(id);
			res.send(invitations);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	};

	getTeammates = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
		const teammatesRepository = getCustomRepository(TeammatesRepository);
		const { id } = req.params;

		try {
			const teammates = <UserProfile[]>await teammatesRepository.getTeammates(id);

			res.send(teammates);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	};

	changeInviteStatus = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
		const teammatesRepository = getCustomRepository(TeammatesRepository);
		const { id } = req.params;
		const {id:teamMateId, status}=req.body

		try {
			await teammatesRepository.changeInviteStatus(id, teamMateId, status==='accept');
			res.send({status:'Status was successfully sent.'});
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	};

	createInvite = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
		const teammatesRepository = getCustomRepository(TeammatesRepository);
		const { id } = req.params;
		const {email:teammateEmail}=req.body

		try {
			await teammatesRepository.createInvitation(id, teammateEmail);
			res.send({status:'The invitation was successfully sent.'});
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	};

}

export default TeammatesController;
