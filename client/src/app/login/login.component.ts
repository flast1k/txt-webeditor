import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    credentials = {username: '', password: ''};

    constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    }

    login() {
        this.authService.authenticate(this.credentials, () => {
            this.router.navigateByUrl('/create');
        });
        return false;
    }

  ngOnInit() {
  }

}
