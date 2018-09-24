import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { AppSettings } from '../app-settings';
import { TdFileService } from '@covalent/core';
import { NgxMsgService } from 'ngx-msg';

const LOGIN_URL = 'user/login';
const CREATE_USER_URL = 'user/add';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authenticated = false;

    constructor(private http: HttpClient) {
    }

    authenticate(credentials) {
        const headers = new HttpHeaders(credentials ? {
            'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password),
            'X-Requested-With': 'XMLHttpRequest',
        } : {});

        return this.http.get(LOGIN_URL, {headers: headers});
    }

    logOut() {
        this.authenticated = false;
        localStorage.removeItem('currentUser');
        this.http.get(AppSettings.LOGOUT_URL).subscribe();
    }

    createUser(user: User) {
        return this.http.post<User>(CREATE_USER_URL, user);
    }
}
