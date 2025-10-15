import { assertPropertiesByValueAndPrimitiveType, DTO, Entity, Schema } from "./entities";


export class Ponto extends Entity {
    static readonly tableName = "ponto";
    static schema: Schema<Ponto> = {
        endereco: 'string',
    }

    constructor(
        public endereco: string, 
        id?: number) {
        super(id);
    }

    class() {
        return Ponto;
    }

    static fromObject(id: number, obj: DTO<Ponto>) {
        return new Ponto(obj.endereco, id);
    }

    static assertValidDTO(obj: unknown): asserts obj is DTO<Ponto> {
        assertPropertiesByValueAndPrimitiveType(obj, Ponto.schema);
    }
}