import { Admin } from "datasource/entity/admin";
import { GenericService } from "./generic-service";
import { GenericRepository } from 'datasource/repository/generic-repository';

export class AdminService extends GenericService<Admin> {
    constructor(repository: GenericRepository<Admin>) {
        super(Admin, repository);
    }

    static async new() {
        return new AdminService(await GenericRepository.new<Admin>('admin'));
    }
}
