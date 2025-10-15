import { AdminController } from 'controller/admin-controller';
import { RotaController } from 'controller/rota-controller';
import { Admin } from 'datasource/entity/Admin';
import { GenericRouter } from 'router/generic-router';


export class AdminRouter extends GenericRouter<Admin> {
	constructor(controller: AdminController, 
		protected rotaController: RotaController) {
		super(controller);
	}

	static async new() {
		return new AdminRouter(await AdminController.new(), await RotaController.new());
	}

	protected setRoutes(): void {
		super.setRoutes();
		this.router.get('/rotas', this.rotaController.getByAdmin);
	}
}