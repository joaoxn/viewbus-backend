import { Admin } from "datasource/entity/Admin";
import { GenericService } from "./generic-service";
import { GenericRepository } from 'datasource/repository/generic-repository';

export class AdminService extends GenericService<Admin> {
    constructor(repository: GenericRepository<Admin>) {
        super(Admin, repository);
    }

    static async new() {
        return new AdminService(await GenericRepository.newGeneric<Admin>('admin'));
    }
}
