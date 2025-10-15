import { GenericController } from 'controller/generic-controller';
import { Rota } from 'datasource/entity/Rota';
import { RotaRepository } from 'datasource/repository/rota-repository';

import { RotaService } from 'service/rota-service';


export class RotaController extends GenericController<Rota> {
    constructor(service: RotaService) {
        super(Rota, service);
    }

    static async new() {
        return new RotaController(await RotaService.new());
    }

    async getByAdmin(req: any, res: any) { //! TODO
        throw Error("'RotaController.getByAdmin(...)' Not Implemented!");
    }
}