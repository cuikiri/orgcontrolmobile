import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Aviso } from './aviso.model';

@Injectable()
export class AvisoService {
    public resourceUrl = Api.API_URL + '/avisos';

    constructor(private http: HttpClient) { }

    create(aviso: Aviso): Observable<Aviso> {
        return this.http.post(this.resourceUrl, aviso);
    }

    update(aviso: Aviso): Observable<Aviso> {
        return this.http.put(this.resourceUrl, aviso);
    }

    find(id: number): Observable<Aviso> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }

}
