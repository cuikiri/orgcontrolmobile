import { BaseEntity } from './../../../models';

export const enum TipoEmail {
    'PESSOAL',
    'COMERCIAL',
    'OUTROS'
}

export class Email implements BaseEntity {
    constructor(
        public id?: number,
        public tipoEmail?: TipoEmail,
        public descricao?: string,
        public pessoa?: BaseEntity,
        public unidade?: BaseEntity,
    ) {
    }
}
