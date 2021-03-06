import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Endereco } from './endereco.model';

@Injectable()
export class EnderecoService {
    private resourceUrl = Api.API_URL + '/enderecos';

    constructor(private http: HttpClient) { }

    create(endereco: Endereco): Observable<Endereco> {
        return this.http.post(this.resourceUrl, endereco);
    }

    update(endereco: Endereco): Observable<Endereco> {
        return this.http.put(this.resourceUrl, endereco);
    }

    find(id: number): Observable<Endereco> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
