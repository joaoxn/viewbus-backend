import { GenericController } from 'controller/generic-controller';
import { Admin } from 'datasource/entity/admin';

import { AdminService } from 'service/admin-service';


export class AdminController extends GenericController<Admin> {
	constructor(service: AdminService) {
		super(Admin, service);
	}

	static async new() {
		return new AdminController(await AdminService.new());
	}
}