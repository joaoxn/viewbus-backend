import { assertPropertiesByValueAndPrimitiveType, DTO, Entity, Schema } from "./entities";


export default class Admin extends Entity {
    static readonly tableName = "admin";
    static schema: Schema<Admin> = {
        nome: 'string',
        email: 'string',
        senha: 'string'
    }

    constructor(
        public nome: string, 
        public email: string, 
        public senha: string,
        id?: number) {
        super(id);
    }

    class() {
        return Admin;
    }

    static fromObject(id: number, obj: DTO<Admin>) {
        return new Admin(obj.nome, obj.email, obj.senha, id);
    }

    static assertValidDTO(obj: unknown): asserts obj is DTO<Admin> {
        assertPropertiesByValueAndPrimitiveType(obj, Admin.schema);
    }
}