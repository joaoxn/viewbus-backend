import { assertPropertiesByValueAndPrimitiveType, DTO, Entity, Schema } from "./entities";


export class Feedback extends Entity {
    avaliacao: number;
    nome: string;
    rota_id: number;
    mensagem: string | undefined;

    static readonly tableName = "feedback";
    static schema: Schema<Feedback> = {
        avaliacao: 'string',
        nome: 'string',
        rota_id: 'number',
        mensagem: ['string', 'undefined'],
    }

    constructor(avaliacao: number, nome: string, rota_id: number, mensagem?: string, id?: number) {
        super(id);
        this.avaliacao = avaliacao;
        this.nome = nome;
        this.rota_id = rota_id;
        this.mensagem = mensagem;
    }

    class() {
        return Feedback;
    }

    static fromObject(id: number, obj: DTO<Feedback>) {
        return new Feedback(obj.avaliacao, obj.nome, obj.rota_id, obj.mensagem, id);
    }

    static assertValidDTO(obj: unknown): asserts obj is DTO<Feedback> {
        assertPropertiesByValueAndPrimitiveType(obj, Feedback.schema);
    }
}