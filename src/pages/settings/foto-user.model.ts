export class FotoUser implements BaseEntity {
    constructor(
		public id?: number, 
		public conteudoContentType?: string, 
		public conteudo?: any
	) {}
}
