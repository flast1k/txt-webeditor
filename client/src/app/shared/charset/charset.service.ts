import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Charset } from './charset';
import { map } from 'rxjs/operators';

const GET_CHARSET_URL = 'charsets';

@Injectable({
    providedIn: 'root'
})
export class CharsetService {
    charsets: Charset[];

    constructor(private http: HttpClient) {
        this.charsets = [];
    }

    getAll(): Observable<Charset[]> {
        return this.http.get<Charset[]>(GET_CHARSET_URL).pipe(map(data => {
            Object.keys(data).forEach(key => {
                this.charsets.push({ value: data[key], viewValue: key });
            });
            return this.charsets;
        }));
    }

}
