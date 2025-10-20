import { RotaController } from 'controller/rota-controller';
import Rota from 'datasource/entity/Rota';
import genericRouter from 'router/generic-router';

export default function rotaRouter(controller: RotaController = new RotaController()) {
    const router = genericRouter<Rota>(controller);
    // this.router.get('/:id/partidas', ); //TODO
    return router;
}
