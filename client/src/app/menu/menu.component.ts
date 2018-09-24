import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs-compat/add/operator/finally';
import { AuthService } from '../shared/auth/auth.service';
import { AppSettings } from '../shared/app-settings';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService,
                private http: HttpClient, private router: Router) {
    }

    logout() {
        this.authService.logOut();
        this.router.navigateByUrl(AppSettings.LOGIN_URL);
    }

    isAuthenticated() {
        return this.authService.authenticated;
    }

    getLoginUrl() {
        return AppSettings.LOGIN_URL;
    }

    getRegisterUrl() {
        return AppSettings.REGISTER_URL;
    }

    getCreateUrl() {
        return AppSettings.CREATE_URL;
    }

    getHistoryUrl() {
        return AppSettings.HISTORY_URL;
    }
}
