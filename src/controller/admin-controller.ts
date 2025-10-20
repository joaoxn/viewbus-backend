import { GenericController } from 'controller/generic-controller';
import Admin from 'datasource/entity/Admin';

import { AdminService } from 'service/admin-service';


export class AdminController extends GenericController<Admin> {
	constructor(service: AdminService = new AdminService()) {
		super(Admin, service);
	}
}