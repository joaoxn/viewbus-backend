import { assertPropertiesByValueAndPrimitiveType, DTO, Entity, Schema } from "./entities";


export class Admin_Rota extends Entity {
    rota_id: number;
    admin_id: number;
    cargo: number;

    static readonly tableName = "admin_rota";
    static schema: Schema<Admin_Rota> = {
        rota_id: 'number',
        admin_id: 'number',
        cargo: 'number'
    }

    constructor(rota_id: number, admin_id: number, cargo: number, id?: number) {
        super(id);
        this.rota_id = rota_id;
        this.admin_id = admin_id;
        this.cargo = cargo;
    }

    class() {
        return Admin_Rota;
    }

    static fromObject(id: number, obj: DTO<Admin_Rota>) {
        return new Admin_Rota(obj.rota_id, obj.admin_id, obj.cargo, id);
    }

    static assertValidDTO(obj: unknown): asserts obj is DTO<Admin_Rota> {
        assertPropertiesByValueAndPrimitiveType(obj, Admin_Rota.schema);
    }
}