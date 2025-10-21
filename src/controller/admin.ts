import bcrypt from 'bcryptjs';
import pool from 'database/db';
import { type Admin, type DTO, getAdmin } from 'database/entities';
import { HttpError } from 'error/error-classes';
import { type Request, type Response } from 'express';

type ShareableAdmin = Omit<Admin, 'senha'>;
export const getId = (req: Request) => {
	const id = req.user?.id;
	if (id == undefined) throw new HttpError(400, "No ID Provided");
	return id;
}
export const get = async (req: Request, res: Response) => {
	const id = getId(req);

	const result = await pool.query<Admin>(`
	SELECT * FROM admin WHERE id = $1
	`, [id]);

	if (result.rowCount == 0)
		throw new HttpError(404, `Admin with ID ${id} not found`);

	const admin: ShareableAdmin & {senha?:string} = result.rows[0];
	if (admin) delete admin.senha;

	res.status(200).json({
		message: "Admin encontrado com sucesso",
		result: admin
	});
}
export const put = async (req: Request, res: Response) => {
	const id = getId(req);
	const adminDTO = getAdmin(req);
	const senhaCodificada = await bcrypt.hash(adminDTO.senha, 10);

	const result = await pool.query<Admin>(`
	UPDATE admin SET nome = $1, email = $2, senha = $3 WHERE id = $4
	`, [adminDTO.nome, adminDTO.email, senhaCodificada, id]);

	if (result.rowCount == 0)
		throw new HttpError(404, `Admin with ID ${id} not found`);

	const admin: ShareableAdmin & {senha?:string} = result.rows[0];
	if (admin != undefined)
		delete admin.senha;

	res.status(200).json({
		message: "Admin atualizado com sucesso",
		result: admin
	});
}

export const remove = async (req: Request, res: Response) => {
	const id = getId(req);

	const result = await pool.query<Admin>(`
	DELETE FROM admin WHERE id = $1
	`, [id]);

	if (result.rowCount == 0)
		throw new HttpError(404, `Admin with ID ${id} not found`);

	const admin: ShareableAdmin & {senha?:string} = result.rows[0];
	if (admin != undefined)
		delete admin.senha;

	res.status(200).json({
		message: "Admin removido com sucesso",
		result: admin
	});
}
