import { assertPropertiesByValueAndPrimitiveType, DTO, Entity, Schema } from "./entities";


export class Rota_Ponto extends Entity {
    static readonly tableName = "rota_ponto";
    static schema: Schema<Rota_Ponto> = {
        rotaId: 'number',
        pontoId: 'number',
    }

    constructor(
        public rotaId: number, 
        public pontoId: number, 
        id?: number) {
        super(id);
    }

    class() {
        return Rota_Ponto;
    }

    static fromObject(id: number, obj: DTO<Rota_Ponto>) {
        return new Rota_Ponto(obj.rotaId, obj.pontoId, id);
    }

    static assertValidDTO(obj: unknown): asserts obj is DTO<Rota_Ponto> {
        assertPropertiesByValueAndPrimitiveType(obj, Rota_Ponto.schema);
    }
}