import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { AuthService } from '../shared/auth/auth.service';
import { NgxMsgLevel, NgxMsgService } from 'ngx-msg';
import { Router } from '@angular/router';
import { AppSettings } from '../shared/app-settings';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    user: User;

    constructor(private authService: AuthService, private msgService: NgxMsgService, private router: Router) {
        this.user = new User();
    }

    create() {
        this.authService.createUser(this.user).subscribe(() => {
                this.msgService.message({level: NgxMsgLevel.Success, text: 'Пользователь успешно создан'});
                this.router.navigateByUrl(AppSettings.LOGIN_URL);
            },
            error => {
                this.msgService.message({level: NgxMsgLevel.Error, text: 'Ошибка при создании пользователя: ' + error.error.errorMessage});
            });
    }

    ngOnInit() {
    }

}
