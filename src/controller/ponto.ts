import pool from 'database/db';
import { getPonto, type Ponto } from 'database/entities';
import { HttpError } from 'error/error-classes';
import { type Request, type Response } from 'express';

// TODO: Alterar responsabilidade de conexão entre rotas e pontos para endpoints de ROTA.
// Assim, apenas Admins que possuem permissão podem alterar essas informações.

const getId = (req: Request) => {
	const id = Number(req.params.id);
	if (id == undefined || isNaN(id)) throw new HttpError(400, 'No ID Provided');
	return id;
};

// !TODO - BUG: Ponto está sendo salvo com propriedades da tabela rota_ponto
export const getByRota = async (req: Request, res: Response) => {
	const rota_id = getId(req);

	const result = await pool.query<Ponto>(`
        SELECT *
        FROM ponto
                 JOIN rota_ponto ON ponto.id = rota_ponto.ponto_id
        WHERE rota_ponto.rota_id = $1
	`, [rota_id]);

	const pontos = result.rows;

	res.status(200).json({
		message: 'Pontos encontrados com sucesso',
		result: pontos
	});
};
export const get = async (req: Request<{ id: string }>, res: Response) => {
	const id = getId(req);

	const result = await pool.query<Ponto>(`
        SELECT *
        FROM ponto
        WHERE id = $1
	`, [id]);

	if (result.rowCount == 0)
		throw new HttpError(404, `Ponto with ID ${id} not found`);

	const ponto = result.rows[0];

	res.status(200).json({
		message: 'Ponto encontrado com sucesso',
		result: ponto
	});
};

export const post = async (req: Request, res: Response) => {
	const pontoDTO = getPonto(req);
	const rotasBody: unknown = req.body.rotas;
	if (!Array.isArray(rotasBody)) throw new HttpError(400, 'Array \'rotas\' não fornecido');
	const rotas = rotasBody.filter(r => typeof r == 'number');

	const result = await pool.query<any>(`
        INSERT INTO ponto (endereco)
        VALUES ($1)
        RETURNING *
	`, [pontoDTO.endereco]);
	const ponto = result.rows[0];

	for (const rotaId of rotas) {
		const junctionResult = await pool.query<any>(`
            INSERT INTO rota_ponto (rota_id, ponto_id)
            VALUES ($1, $2)
		`, [rotaId, ponto.id]);
	}

	res.status(201).json({
		message: 'Ponto criado com sucesso',
		result: ponto
	});
};

// Opcional: Passar propriedade 'rotas' no body, um array de ids (números)
export const put = async (req: Request<{ id: string }>, res: Response) => {
	const id = getId(req); // Get Ponto ID
	const pontoDTO = getPonto(req); // Get Ponto data
	const rotasBody: unknown = req.body.rotas;

	if (Array.isArray(rotasBody)) {
		const rotas = rotasBody.filter(r => typeof r === 'number'); // Validate rotas
		// Clear existing relationships in rota_ponto
		await pool.query(`
            DELETE
            FROM rota_ponto
            WHERE ponto_id = $1
		`, [id]);

		// Insert new relationships
		for (const rotaId of rotas) {
			await pool.query(`
                INSERT INTO rota_ponto (rota_id, ponto_id)
                VALUES ($1, $2)
			`, [rotaId, id]);
		}
	}

	// Update ponto table
	const result = await pool.query<Ponto>(`
        UPDATE ponto
        SET endereco = $1
        WHERE id = $2 
        RETURNING *
	`, [pontoDTO.endereco, id]);

	if (result.rowCount === 0) {
		throw new HttpError(404, `Ponto with ID ${id} not found`);
	}
	const ponto = result.rows[0];

	res.status(200).json({
		message: 'Ponto e rotas atualizados com sucesso',
		result: ponto
	});
};

export const remove = async (req: Request<{ id: string }>, res: Response) => {
	const id = getId(req);

	const result = await pool.query<any>(`
        DELETE
        FROM ponto
        WHERE id = $1
        RETURNING *
	`, [id]);

	if (result.rowCount == 0)
		throw new HttpError(404, `Ponto with ID ${id} not found`);

	const ponto = result.rows[0];
	res.status(200).json({
		message: 'Ponto removido com sucesso',
		result: ponto
	});
};
