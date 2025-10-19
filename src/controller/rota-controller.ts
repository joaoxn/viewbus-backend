import { GenericController } from 'controller/generic-controller';
import { Rota } from 'datasource/entity/Rota';
import { RotaRepository } from 'datasource/repository/rota-repository';

import { RotaService } from 'service/rota-service';


export class RotaController extends GenericController<Rota> {
    constructor(service: RotaService = new RotaService()) {
        super(Rota, service);
    }

    async getByAdmin(req: any, res: any) { //! TODO
        throw Error("'RotaController.getByAdmin(...)' Not Implemented!");
    }
}