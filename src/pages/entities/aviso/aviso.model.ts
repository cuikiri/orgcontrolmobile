import { BaseEntity } from './../../../models';

export const enum TipoAviso {
    IMPORTANTE = 'IMPORTANTE',
    URGENTE = 'URGENTE',
    NORMAL = 'NORMAL'
}

export class Aviso implements BaseEntity {
	constructor(
		public id?: number, 
		public data?: any, 
		public aviso?: string, 
		public tipo?: TipoAviso
	) {
	}
}
