import pool from 'datasource/database/database';
import Rota from "datasource/entity/Rota";
import { GenericRepository } from "./generic-repository";

export default class RotaRepository extends GenericRepository<Rota> {
    constructor() {
        super('rota');
    }

    async getByAdmin(adminId: number) {
        const result = await pool.query<Rota>(
            `SELECT rota.*
            FROM rota
            INNER JOIN admin_rota ON rota.id = admin_rota.rota_id
            WHERE admin_rota.admin_id = $1`, [adminId]
        );
        return result.rows;
    }
}