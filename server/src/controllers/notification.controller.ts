import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { NotificationRepository } from '../repositories/notification.repository';
import { getWebError } from '../helpers/error.helper';

export class NotificationController {
	getAll = async (req: Request, res: Response) => {
		const repository = getCustomRepository(NotificationRepository);
		const { id } = req.user;

		try {
			const result = await repository.findAllByUser(id);
			res.send(result);
		} catch (err) {
			res.status(500).send(getWebError(err, 500));
		}
	};

	getOneById = async (req: Request, res: Response) => {
		const repository = getCustomRepository(NotificationRepository);
		const { id } = req.params;

		try {
			const result = await repository.findOneById(id);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	};

	postNotification = async (req: Request, res: Response) => {
		const { body: data } = req;
		const repository = getCustomRepository(NotificationRepository);

		try {
			const result = await repository.createOne(data);
			res.send(result);
		} catch (err) {
			res.status(422).send(getWebError(err, 422));
		}
	};

	updateNotification = async (req: Request, res: Response) => {
		const {
			body: data,
			params: { id },
		} = req;

		const repository = getCustomRepository(NotificationRepository);

		try {
			const result = await repository.updateOneById(id, data);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	};

	viewNotification = async (req: Request, res: Response) => {
		const { id } = req.params;
		const repository = getCustomRepository(NotificationRepository);

		try {
			const result = await repository.viewOneById(id);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	};

	unviewNotification = async (req: Request, res: Response) => {
		const { id } = req.params;
		const repository = getCustomRepository(NotificationRepository);

		try {
			const result = await repository.unviewOneById(id);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	};

	viewAllNotifications = async (req: Request, res: Response) => {
		const { id } = req.user;
		const repository = getCustomRepository(NotificationRepository);

		try {
			const result = await repository.viewAll(id);
			res.send(result);
		} catch (err) {
			res.status(500).send(getWebError(err, 500));
		}
	};

	deleteNotification = async (req: Request, res: Response) => {
		const { id } = req.params;
		const repository = getCustomRepository(NotificationRepository);

		try {
			const result = await repository.deleteOneById(id);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	};
}
