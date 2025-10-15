import { assertPropertiesByValueAndPrimitiveType, DTO, Entity, Schema } from "./entities";


export class Partida extends Entity {
    hora: number;
    minuto: number;
    dia_semana: number;
    rota_id: number;

    static readonly tableName = "partida";
    static schema: Schema<Partida> = {
        hora: 'number',
        minuto: 'number',
        dia_semana: 'number',
        rota_id: 'number',
    }

    constructor(hora: number, minuto: number, dia_semana: number, rota_id: number, id?: number) {
        super(id);
        this.hora = hora;
        this.minuto = minuto;
        this.dia_semana = dia_semana;
        this.rota_id = rota_id;
    }

    class() {
        return Partida;
    }

    static fromObject(id: number, obj: DTO<Partida>) {
        return new Partida(obj.hora, obj.minuto, obj.dia_semana, obj.rota_id, id);
    }

    static assertValidDTO(obj: unknown): asserts obj is DTO<Partida> {
        assertPropertiesByValueAndPrimitiveType(obj, Partida.schema);
    }
}