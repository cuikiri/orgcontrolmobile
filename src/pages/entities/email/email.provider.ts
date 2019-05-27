import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Email } from './email.model';

@Injectable()
export class EmailService {
    private resourceUrl = Api.API_URL + '/emails';

    constructor(private http: HttpClient) { }

    create(email: Email): Observable<Email> {
        return this.http.post(this.resourceUrl, email);
    }

    update(email: Email): Observable<Email> {
        return this.http.put(this.resourceUrl, email);
    }

    find(id: number): Observable<Email> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
