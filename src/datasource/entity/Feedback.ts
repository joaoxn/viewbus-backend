import { assertPropertiesByValueAndPrimitiveType, DTO, Entity, Schema } from "./entities";


export class Feedback extends Entity {

    static readonly tableName = "feedback";
    static schema: Schema<Feedback> = {
        avaliacao: 'string',
        nome: 'string',
        rotaId: 'number',
        mensagem: ['string', 'undefined'],
    }

    constructor(
        public avaliacao: number, 
        public nome: string, 
        public rotaId: number, 
        public mensagem: string | undefined, 
        id?: number) {
        super(id);
    }

    class() {
        return Feedback;
    }

    static fromObject(id: number, obj: DTO<Feedback>) {
        return new Feedback(obj.avaliacao, obj.nome, obj.rotaId, obj.mensagem, id);
    }

    static assertValidDTO(obj: unknown): asserts obj is DTO<Feedback> {
        assertPropertiesByValueAndPrimitiveType(obj, Feedback.schema);
    }
}