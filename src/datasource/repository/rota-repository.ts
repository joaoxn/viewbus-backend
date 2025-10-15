import { Rota } from "datasource/entity/Rota";
import { GenericRepository } from "./generic-repository";
import { Database } from "sqlite";
import { requireDB } from "datasource/database/database";

export class RotaRepository extends GenericRepository<Rota> {
    constructor(db: Database) {
        super(db, 'rota');
    }

    // static async new() { //TODO
    //     const db = await requireDB();
    //     return new RotaRepository(db);
    // }

    async getByAdmin(adminId: number) {
        console.log("TESTINGGGGGGGGGGGG")
        return await this.db.all(
            `SELECT rota.*
            FROM rota
            INNER JOIN admin_rota ON rota.id = admin_rota.rotaId
            WHERE admin_rota.adminId = ${adminId}`
        );
    }
}