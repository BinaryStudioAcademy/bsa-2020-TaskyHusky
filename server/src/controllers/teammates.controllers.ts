import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import {TeammatesRepository} from '../repositories/teammates.repository';

class TeammatesController {
	getIncomingInvitation = async (req: Request, res: Response): Promise<void> => {
		const teammatesRepository = getCustomRepository(TeammatesRepository);
		const { id } = req.params;

		try {
			const invitations = await teammatesRepository.getIncomingInvitations(id);
			res.send(invitations);
		} catch (error) {
			res.status(404).send(error.message);
		}
	};

	getPendingInvitation = async (req: Request, res: Response): Promise<void> => {
		const teammatesRepository = getCustomRepository(TeammatesRepository);
		const { id } = req.params;

		try {
			const invitations = await teammatesRepository.getPendingInvitations(id);
			res.send(invitations);
		} catch (error) {
			res.status(404).send(error.message);
		}
	};

	createInvite = async (req: Request, res: Response): Promise<void> => {
		const teammatesRepository = getCustomRepository(TeammatesRepository);
		const { id } = req.params;
		const {id:teamMateId}=req.body

		try {
			await teammatesRepository.createInvitation(id, teamMateId);
			res.send({status:'The invitation was successfully sent.'});
		} catch (error) {
			res.status(404).send(error.message);
		}
	};

}

export default TeammatesController;
