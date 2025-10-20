import { assertPropertiesByValueAndPrimitiveType, DTO, Entity, Schema } from "./entities";


export default class Admin_Rota extends Entity {

    static readonly tableName = "admin_rota";
    static schema: Schema<Admin_Rota> = {
        rotaId: 'number',
        adminId: 'number',
        cargo: 'number'
    }

    constructor(
        public rotaId: number, 
        public adminId: number, 
        public cargo: number, 
        id?: number) {
        super(id);
    }

    class() {
        return Admin_Rota;
    }

    static fromObject(id: number, obj: DTO<Admin_Rota>) {
        return new Admin_Rota(obj.rotaId, obj.adminId, obj.cargo, id);
    }

    static assertValidDTO(obj: unknown): asserts obj is DTO<Admin_Rota> {
        assertPropertiesByValueAndPrimitiveType(obj, Admin_Rota.schema);
    }
}