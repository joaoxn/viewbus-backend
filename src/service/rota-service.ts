import Rota from "datasource/entity/Rota";
import GenericService from "./generic-service";
import RotaRepository from "datasource/repository/rota-repository";

export default class RotaService extends GenericService<Rota, RotaRepository> {
    constructor(repository: RotaRepository = new RotaRepository()) {
        super(Rota, repository);
    }

    async getByAdmin(adminId: number) {
        return this.repository.getByAdmin(adminId);
    }
}
