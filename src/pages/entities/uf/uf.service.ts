import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Uf } from './uf.model';

@Injectable()
export class UfService {
    public resourceUrl = Api.API_URL + '/ufs';

    constructor(private http: HttpClient) {}

    create(entity: Uf): Observable<Uf> {
        return this.http.post(this.resourceUrl, entity);
    }

    update(entity: Uf): Observable<Uf> {
        return this.http.put(this.resourceUrl, entity);
    }

    find(id: number): Observable<Uf> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
