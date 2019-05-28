import { BaseEntity } from './../../../models';

export const enum Regiao {
    CENTRAL = 'CENTRAL',
    LESTE = 'LESTE',
    OESTE = 'OESTE',
    NORTE = 'NORTE',
    SUL = 'SUL',
    SUDESTE = 'SUDESTE',
    NORDESTE = 'NORDESTE'
}

export class Uf implements BaseEntity {
	constructor(
		public id?: number, 
		public nome?: string, 
		public estdo?: string, 
		public regiao?: Regiao
	) {
	}
}
