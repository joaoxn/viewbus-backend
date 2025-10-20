import Admin from "datasource/entity/Admin";
import { GenericService } from "./generic-service";
import { GenericRepository } from 'datasource/repository/generic-repository';

export class AdminService extends GenericService<Admin> {
    constructor(repository: GenericRepository<Admin> = new GenericRepository<Admin>('admin')) {
        super(Admin, repository);
    }
}
