import { EntityConstructor, type DTO, type Entity, Raw } from "datasource/entity/entities";
import { HttpError } from "infra/error/error-classes";
import {GenericRepository} from "datasource/repository/generic-repository";

export class GenericService<T extends Entity, R extends GenericRepository<T> = GenericRepository<T>> {
	constructor(private EntityConstructor: EntityConstructor<T>, protected repository: R) {}

	async getAll(): Promise<Raw<T>[]> {
		return await this.repository.getAll();
	}

	async get(id: number): Promise<Raw<T>> {
		const entity = await this.repository.get(id);

		if (!entity)
			throw new HttpError(404, `No Entity found with ID '${id}'`);

		return entity;
	}

	async add(entityDTO: DTO<T>): Promise<Raw<T>> {
		return await this.repository.save(entityDTO);
	}

	async put(id: number, entityDTO: DTO<T>): Promise<Raw<T>> {
		return await this.repository.replace(id, entityDTO);
	}

	async remove(id: number) {
		return await this.repository.delete(id);
	}
}
