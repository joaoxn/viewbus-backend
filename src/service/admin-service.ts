import Admin from "datasource/entity/Admin";
import AdminRepository from 'datasource/repository/admin-repository';
import GenericService from "./generic-service";
import { GenericRepository } from 'datasource/repository/generic-repository';

export default class AdminService extends GenericService<Admin, AdminRepository> {
    constructor(repository: AdminRepository = new AdminRepository()) {
        super(Admin, repository);
    }

    async getByEmail(email: string) {
        return this.repository.getByEmail(email);
    }
}
