import { BaseEntity } from './../../../models';

export const enum TipoTelefone {
    'CELULAR',
    'FAX',
    'RESIDENCIAL',
    'COMERCIAL',
    'OUTROS'
}

export class Telefone implements BaseEntity {
    constructor(
        public id?: number,
        public tipoTelefone?: TipoTelefone,
        public numero?: string,
        public pessoa?: BaseEntity,
        public unidade?: BaseEntity,
    ) {
    }
}
