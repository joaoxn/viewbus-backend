import { Entity } from 'datasource/entity/entities';
import { GenericController } from "controller/generic-controller";
import { Router } from "express";

export default function genericRouter<T extends Entity>(controller: GenericController<T>) {
    const router = Router();
    router.get('', controller.getAll);
    router.get('/:id', controller.get);
    router.post('', controller.post);
    router.put('/:id', controller.put);
    router.delete('/:id', controller.remove);
    return router;
}
