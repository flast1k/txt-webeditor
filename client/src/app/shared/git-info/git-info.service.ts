import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const GET_VERSION_URL = 'version';
const VERSION_PROPERTY = 'git.build.version';

@Injectable()
export class GitInfoService {

    constructor(private http: HttpClient) {
    }

    getVersion(): Observable<string> {
        return this.http.get(GET_VERSION_URL).pipe(
            map(response => {
                return response[VERSION_PROPERTY];
            }));
    }
}
