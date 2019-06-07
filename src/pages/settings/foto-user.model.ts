export class FotoUser {
	public id?: number;
	public conteudoContentType?: string;
	public conteudo?: any;
	
    constructor(
		id?: number, 
		conteudoContentType?: string, 
		conteudo?: any
	) {
		this.id = id ? id : null;
		this.conteudoContentType = conteudoContentType ? conteudoContentType : null;
		this.conteudo = conteudo ? conteudo : null;
	}
}
