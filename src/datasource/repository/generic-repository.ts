import { DTO, Entity, Raw, Schema } from "datasource/entity/entities";
import { HttpError } from 'infra/error/error-classes';
import pool from 'datasource/database/database';

import { Admin } from "datasource/entity/Admin";
import { Feedback } from "datasource/entity/Feedback";
import { Partida } from "datasource/entity/Partida";
import { Ponto } from "datasource/entity/Ponto";
import { Rota } from "datasource/entity/Rota";
import { Admin_Rota } from "datasource/entity/Admin_Rota";
import { Rota_Ponto } from "datasource/entity/Rota_Ponto";

const schemas = {
    admin: Admin.schema,
    admin_rota: Admin_Rota.schema,
    rota: Rota.schema,
    rota_ponto: Rota_Ponto.schema,
    ponto: Ponto.schema,
    partida: Partida.schema,
    feedback: Feedback.schema,
};

export type TableName = keyof typeof schemas;

export class GenericRepository<T extends Entity> {
    readonly schema: Schema<T>;

    constructor(protected readonly tableName: TableName) {
        this.schema = schemas[tableName] as Schema<T>;
    }

    async getAll(): Promise<Raw<T>[]> {
        const result = await pool.query<Raw<T>>(
            `SELECT * FROM $1`, [this.tableName]);
        return result.rows;
    }

    async get(id: number): Promise<Raw<T> | undefined> {
        const result = await pool.query<Raw<T>>(`
            SELECT *
            FROM ${this.tableName}
            WHERE id = $1`, [id]);
        return result.rows[0];
    }

    async save(entity: DTO<T>): Promise<Raw<T>> {
        const schemaProperties: string[] = [];
        const entityProperties = [];

        for (const property in this.schema) {
            schemaProperties.push(property);
            if (!(property in entity)) throw new Error(`Property '${property}' is missing from entity`);
            entityProperties.push(entity[(property as keyof DTO<T>)]);
        }

        const queryResult = await pool.query<Raw<T>>(`
            INSERT INTO ${this.tableName} (${schemaProperties.join(',')})
            VALUES (${schemaProperties.map((_v, i) => '$'+(i+1)).join(',')})`,
            entityProperties
        );
        const response = queryResult.rows[0];

        if (response.id === undefined) throw new Error(
            `Error while saving entity to database. Result ID is undefined`
        )

        return response;
    }

    async replace(id: number, entity: DTO<T>): Promise<Raw<T>> {
        const dataAsString = Object.keys(entity).map(key => `${key} = ?`).join(', ');
        const result = await pool.query(`
            UPDATE ${this.tableName} 
            SET ${dataAsString} WHERE id = ?`,
            Object.values(entity).concat(id)
        );

        if (result.rowCount === 0) throw new HttpError(404, `No Entity found with ID '${id}'`);

        const response: DTO<T> & {id?: number} = {...entity}
        delete response.id;
        return {
            id: id,
            ...response
        } as Raw<T>;
    }

    async delete(id: number): Promise<void> {
        const result = await pool.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
        if (result.rowCount === 0) throw new HttpError(404, `No Entity found with ID '${id}'`);
    }
}

