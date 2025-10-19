import { Rota } from "datasource/entity/Rota";
import { GenericService } from "./generic-service";
import { RotaRepository } from "datasource/repository/rota-repository";

export class RotaService extends GenericService<Rota> {
    constructor(repository: RotaRepository = new RotaRepository()) {
        super(Rota, repository);
    }

    async getByAdmin() {
        
    }
}
