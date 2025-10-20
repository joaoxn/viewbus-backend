import AdminController from 'controller/admin-controller';
import RotaController from 'controller/rota-controller';
import Admin from 'datasource/entity/Admin';
import genericRouter from 'router/generic-router';

export default function adminRouter(
	controller: AdminController = new AdminController(),
	rotaController: RotaController = new RotaController()
) {
	const router = genericRouter<Admin>(controller);
	router.get('/rotas', rotaController.getByAdmin);
	return router;
}
