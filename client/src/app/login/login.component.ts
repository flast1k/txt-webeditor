import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxMsgLevel, NgxMsgService } from 'ngx-msg';
import { AppSettings } from '../shared/app-settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    credentials = {username: '', password: ''};

    constructor(private authService: AuthService, private http: HttpClient, private router: Router, private msgService: NgxMsgService) {
    }

    login() {
        this.authService.authenticate(this.credentials).subscribe(response => {
                if (response !== null) {
                    this.authService.authenticated = response.hasOwnProperty('name');
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    this.msgService.message({level: NgxMsgLevel.Success, text: 'Успешно загружено'});
                    this.router.navigateByUrl(AppSettings.CREATE_URL);
                }
            },
            error => {
                if (error.status === 401) {
                    let i = 0;
                }
                this.authService.authenticated = false;
                this.msgService.message({level: NgxMsgLevel.Error, text: 'Ошибка при входе: ' + error.statusText});
            });
    }

  ngOnInit() {
  }

}
