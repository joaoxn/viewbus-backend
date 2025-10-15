import { assertPropertiesByValueAndPrimitiveType, DTO, Entity, Schema } from "./entities";


export class Admin extends Entity {
    nome: string;
    email: string;
    password: string;

    static readonly tableName = "admin";
    static schema: Schema<Admin> = {
        nome: 'string',
        email: 'string',
        password: 'string'
    }

    constructor(name: string, email: string, password: string, id?: number) {
        super(id);
        this.nome = name;
        this.email = email;
        this.password = password;
    }

    class() {
        return Admin;
    }

    static fromObject(id: number, obj: DTO<Admin>) {
        return new Admin(obj.nome, obj.email, obj.password, id);
    }

    static assertValidDTO(obj: unknown): asserts obj is DTO<Admin> {
        assertPropertiesByValueAndPrimitiveType(obj, Admin.schema);
    }
}