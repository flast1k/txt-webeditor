import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { CovalentFileModule } from '@covalent/core/file';
import { NgxMsgModule } from 'ngx-msg';
import { RouterModule, Routes } from '@angular/router';
import { FileInfoService } from './shared/file-info/file-info.service';
import { GitInfoService } from './shared/git-info/git-info.service';
import { FileInfo } from './shared/file-info/file-info.model';
import { AppComponent } from './app.component';
import { FileInfoListComponent } from './file-info-list/file-info-list.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUpdateComponent } from './file-update/file-update.component';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppSettings } from './shared/app-settings';
import { FileCreateComponent } from './file-create/file-create.component';

const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: AppSettings.LOGIN_URL},
    {path: AppSettings.UPLOAD_URL, component: FileUploadComponent},
    {path: AppSettings.HISTORY_URL, component: FileInfoListComponent},
    {path: AppSettings.LOGIN_URL, component: LoginComponent},
    {path: AppSettings.REGISTER_URL, component: RegisterComponent},
    {path: AppSettings.EDIT_URL, component: FileUpdateComponent},
    {path: AppSettings.NEW_URL, component: FileCreateComponent},
];

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const xhr = req.clone({
            headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
        });
        return next.handle(xhr);
    }
}

@NgModule({
    declarations: [
        AppComponent, FileInfoListComponent, FileInfoListComponent, FileUploadComponent,
        FileUpdateComponent, MenuComponent, FooterComponent, LoginComponent, RegisterComponent, FileCreateComponent
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatToolbarModule,
        HttpClientModule,
        MatIconModule,
        MatTableModule,
        FormsModule,
        NgxMsgModule.forRoot(),
        CovalentFileModule,
        RouterModule.forRoot(appRoutes),
        MatMenuModule,
        LayoutModule,
        MatSidenavModule,
        MatSelectModule,
        MatStepperModule,
        MatListModule,
        ReactiveFormsModule,
        CodemirrorModule
    ],
    providers: [FileInfoService, FileInfo, GitInfoService, {
        provide: HTTP_INTERCEPTORS,
        useClass: XhrInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
