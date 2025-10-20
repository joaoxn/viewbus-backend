import pool from 'datasource/database/database';
import type Admin from 'datasource/entity/Admin';
import Rota from "datasource/entity/Rota";
import { GenericRepository } from "./generic-repository";

export default class AdminRepository extends GenericRepository<Admin> {
    constructor() {
        super('admin');
    }

    async getByEmail(email: string): Promise<Admin | undefined> {
        const result = await pool.query<Admin>(`
            SELECT admin.* FROM admin
            WHERE admin.email = $1`, [email]
        );
        return result.rows[0];
    }
}