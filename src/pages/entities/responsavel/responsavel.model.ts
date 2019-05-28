import { BaseEntity } from './../../../models';

export class Responsavel implements BaseEntity {
	constructor(
		public id?: number, 
		public data?: any, 
		public obs?: string
	) {
	}
}
