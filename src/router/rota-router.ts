import { AdminController } from 'controller/admin-controller';
import { RotaController } from 'controller/rota-controller';
import { Rota } from 'datasource/entity/Rota';
import { GenericRouter } from 'router/generic-router';


export class RotaRouter extends GenericRouter<Rota> {
    static async new() {
        return new RotaRouter(await RotaController.new());
    }

    protected setRoutes(): void {
        super.setRoutes();
        // this.router.get('/:id/partidas', ); //TODO
    }
}