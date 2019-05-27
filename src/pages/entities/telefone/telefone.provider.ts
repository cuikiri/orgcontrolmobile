import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Telefone } from './telefone.model';

@Injectable()
export class TelefoneService {
    private resourceUrl = Api.API_URL + '/telefones';

    constructor(private http: HttpClient) { }

    create(telefone: Telefone): Observable<Telefone> {
        return this.http.post(this.resourceUrl, telefone);
    }

    update(telefone: Telefone): Observable<Telefone> {
        return this.http.put(this.resourceUrl, telefone);
    }

    find(id: number): Observable<Telefone> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
