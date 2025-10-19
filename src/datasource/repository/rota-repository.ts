import pool from 'datasource/database/database';
import { Rota } from "datasource/entity/Rota";
import { GenericRepository } from "./generic-repository";

export class RotaRepository extends GenericRepository<Rota> {
    constructor() {
        super('rota');
    }

    async getByAdmin(adminId: number) {
        console.log("TESTINGGGGGGGGGGGG")
        return await pool.query(
            `SELECT rota.*
            FROM rota
            INNER JOIN admin_rota ON rota.id = admin_rota.rotaId
            WHERE admin_rota.adminId = ${adminId}`
        );
    }
}