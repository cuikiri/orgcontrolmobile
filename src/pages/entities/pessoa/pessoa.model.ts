import { BaseEntity } from './../../../models';

export class Pessoa implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public telefones?: BaseEntity[],
        public emails?: BaseEntity[],
        public enderecos?: BaseEntity[],
        public documentos?: BaseEntity[],
        public avisos?: BaseEntity[],
        public colaborador?: BaseEntity,
        public responsavel?: BaseEntity,
        public aluno?: BaseEntity,
        public alunoMae?: BaseEntity,
        public alunoPai?: BaseEntity,
        public alunoIrmao?: BaseEntity,
    ) {
    }
}
