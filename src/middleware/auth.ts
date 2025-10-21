import pool from 'database/db';
import { HttpError } from 'error/error-classes';
import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export async function auth(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
	if (!token) return new HttpError(401, "No Token Provided");

	if (process.env.JWT_SECRET == undefined)
		throw new Error("JWT_SECRET não foi definido como variável de ambiente");

	try {
		// Decodifica e armazena dados do usuário no request
		const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & typeof req.user | string;
		if (typeof payload == 'string')
			// noinspection ExceptionCaughtLocallyJS
			throw new jwt.JsonWebTokenError("Invalid Token");

		req.user = {
			id: payload.id,
			nome: payload.nome,
			email: payload.email
		}

		const result = await pool.query('SELECT * FROM admin WHERE id = $1', [req.user.id]);
		if (result.rowCount == 0)
			throw new jwt.JsonWebTokenError("Invalid Token");

		next();
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError)
			throw new HttpError(401, "Invalid Token");
		if (e instanceof jwt.TokenExpiredError)
			throw new HttpError(401, "Token Expired");
		if (e instanceof jwt.NotBeforeError)
			throw new HttpError(401, "Token is not valid yet");
		throw e;
	}
}