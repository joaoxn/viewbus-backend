import { assertPropertiesByValueAndPrimitiveType, DTO, Entity, Schema } from "./entities";


export class Rota extends Entity {
    static readonly tableName = "rota";
    static schema: Schema<Rota> = {
        codigo: 'number',
        origem: 'string',
        destino: 'string',
        via: ['string', 'undefined']
    }

    constructor(
        public codigo: number, 
        public origem: string, 
        public destino: string, 
        public via: string | undefined, 
        id?: number) {
        super(id);
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.via = via;
    }

    class() {
        return Rota;
    }

    static fromObject(id: number, obj: DTO<Rota>) {
        return new Rota(obj.codigo, obj.origem, obj.destino, obj.via, id);
    }

    static assertValidDTO(obj: unknown): asserts obj is DTO<Rota> {
        assertPropertiesByValueAndPrimitiveType(obj, Rota.schema);
    }
}