import GenericController from 'controller/generic-controller';
import Rota from 'datasource/entity/Rota';
import type { Request, Response } from 'express';

import { RotaService } from 'service/rota-service';


export default class RotaController extends GenericController<Rota, RotaService> {
    constructor(service: RotaService = new RotaService()) {
        super(Rota, service);
    }

    async getByAdmin(req: Request, res: Response) {
        res.status(200).json(this.service.getByAdmin(req.user?.id as number));
    }
}