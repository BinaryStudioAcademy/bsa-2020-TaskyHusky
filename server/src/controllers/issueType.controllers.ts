import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { getWebError } from '../helpers/error.helper';
import { IssueTypeRepository } from '../repositories/issueType.repository';

class IssueTypeController {
    async getAll(req: Request, res: Response) {
        const repository = getCustomRepository(IssueTypeRepository);

        try {
            const result = await repository.findAll();
            res.send(result);
        } catch (err) {
            res.status(500).send(getWebError(err, 500));
        }
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const repository = getCustomRepository(IssueTypeRepository);

        try {
            const result = await repository.findOneById(id);
            res.send(result);
        } catch (err) {
            res.status(404).send(getWebError(err, 404));
        }
    }

    async create(req: Request, res: Response) {
        const { body: data } = req;
        const repository = getCustomRepository(IssueTypeRepository);

        try {
            const result = await repository.createOne(data);
            res.status(201).send(result);
        } catch (err) {
            res.status(422).send(getWebError(err, 422));
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { body: data } = req;
        const repository = getCustomRepository(IssueTypeRepository);

        try {
            const result = await repository.updateOneById(id, data);
            res.send(result);
        } catch (err) {
            res.status(404).send(getWebError(err, 404));
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const repository = getCustomRepository(IssueTypeRepository);

        try {
            const result = await repository.deleteOneById(id);
            res.send(result);
        } catch (err) {
            res.status(404).send(getWebError(err, 404));
        }
    }
}

export default IssueTypeController;
