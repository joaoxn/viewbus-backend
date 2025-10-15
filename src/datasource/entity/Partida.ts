import { assertPropertiesByValueAndPrimitiveType, DTO, Entity, Schema } from "./entities";


export class Partida extends Entity {
    static readonly tableName = "partida";
    static schema: Schema<Partida> = {
        hora: 'number',
        minuto: 'number',
        dia_semana: 'number',
        rotaId: 'number',
    }

    constructor(
        public hora: number, 
        public minuto: number, 
        public dia_semana: number, 
        public rotaId: number, 
        id?: number) {
        super(id);
    }

    class() {
        return Partida;
    }

    static fromObject(id: number, obj: DTO<Partida>) {
        return new Partida(obj.hora, obj.minuto, obj.dia_semana, obj.rotaId, id);
    }

    static assertValidDTO(obj: unknown): asserts obj is DTO<Partida> {
        assertPropertiesByValueAndPrimitiveType(obj, Partida.schema);
    }
}