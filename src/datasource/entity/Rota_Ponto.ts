import { assertPropertiesByValueAndPrimitiveType, DTO, Entity, Schema } from "./entities";


export class Rota_Ponto extends Entity {
    rota_id: number;
    ponto_id: number;

    static readonly tableName = "rota_ponto";
    static schema: Schema<Rota_Ponto> = {
        rota_id: 'number',
        ponto_id: 'number',
    }

    constructor(name: number, ponto_id: number, id?: number) {
        super(id);
        this.rota_id = name;
        this.ponto_id = ponto_id;
    }

    class() {
        return Rota_Ponto;
    }

    static fromObject(id: number, obj: DTO<Rota_Ponto>) {
        return new Rota_Ponto(obj.rota_id, obj.ponto_id, id);
    }

    static assertValidDTO(obj: unknown): asserts obj is DTO<Rota_Ponto> {
        assertPropertiesByValueAndPrimitiveType(obj, Rota_Ponto.schema);
    }
}