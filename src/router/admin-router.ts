import { AdminController } from 'controller/admin-controller';
import { Admin } from 'datasource/entity/admin';
import { GenericRouter } from 'router/generic-router';


export class AdminRouter extends GenericRouter<Admin> {
	static async new() {
		return new AdminRouter(await AdminController.new());
	}
}