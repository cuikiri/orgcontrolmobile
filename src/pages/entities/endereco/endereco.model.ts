import { BaseEntity } from './../../../models';

export const enum TipoResidencia {
    'CASA',
    'APARTAMENTO',
    'SITIO',
    'FAZENDA'
}

export const enum EnderecoTipo {
    'RESIDENCIAL',
    'COMERCIAL',
    'ESTUDANTIL'
}

export const enum TipoLogradouro {
    'RUA',
    'AVENIDA',
    'TRAVESSA',
    'ESTRADA',
    'RODOVIA'
}

export const enum TipoBairro {
    'RESIDENCIAL',
    'COMERCIAL',
    'INDUSTRIAL'
}

export const enum Regiao {
    'CENTRAL',
    'LESTE',
    'OESTE',
    'NORTE',
    'SUL',
    'SUDESTE',
    'NORDESTE'
}

export class Endereco implements BaseEntity {
    constructor(
        public id?: number,
        public tipoResidencia?: TipoResidencia,
        public tipoEndereco?: EnderecoTipo,
        public tipoLogradouro?: TipoLogradouro,
        public nome?: string,
        public numero?: number,
        public bairro?: string,
        public tipoBairoo?: TipoBairro,
        public zona?: Regiao,
        public cep?: string,
        public bloco?: string,
        public apto?: string,
        public complemento?: string,
        public cidade?: string,
        public uf?: BaseEntity,
        public localizacao?: BaseEntity,
        public unidade?: BaseEntity,
        public pessoa?: BaseEntity,
    ) {
    }
}
