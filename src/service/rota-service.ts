import { Rota } from "datasource/entity/Rota";
import { GenericService } from "./generic-service";
import { RotaRepository } from "datasource/repository/rota-repository";

export class RotaService extends GenericService<Rota> {
    constructor(repository: RotaRepository) {
        super(Rota, repository);
    }

    static async new() {
        return new RotaService(await RotaRepository.new());
    }

    async getByAdmin() {
        
    }
}
