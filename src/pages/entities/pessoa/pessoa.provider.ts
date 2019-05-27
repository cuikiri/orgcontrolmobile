import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Pessoa } from './pessoa.model';

@Injectable()
export class PessoaService {
    private resourceUrl = Api.API_URL + '/pessoas';

    constructor(private http: HttpClient) { }

    create(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.post(this.resourceUrl, pessoa);
    }

    update(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.put(this.resourceUrl, pessoa);
    }

    find(id: number): Observable<Pessoa> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
