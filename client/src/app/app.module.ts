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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CovalentFileModule} from '@covalent/core/file';
import {NgxMsgModule} from 'ngx-msg';
import {RouterModule, Routes} from '@angular/router';
import {FileInfoService} from './shared/file-info/file-info.service';
import {GitInfoService} from './shared/git-info/git-info.service';
import {FileInfo} from "./shared/file-info/file-info.model";
import {AppComponent} from './app.component';
import {FileInfoListComponent} from './file-info-list/file-info-list.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {FileUpdateComponent} from './file-update/file-update.component';
import {MenuComponent} from './menu/menu.component';
import {LayoutModule} from '@angular/cdk/layout';
import {CodemirrorModule} from '@ctrl/ngx-codemirror';
import {FooterComponent} from './footer/footer.component';

const appRoutes: Routes = [
    {path: '', component: FileUploadComponent},
    {path: 'history', component: FileInfoListComponent},
];

@NgModule({
    declarations: [
        AppComponent, FileInfoListComponent, FileInfoListComponent, FileUploadComponent, FileUpdateComponent, MenuComponent, FooterComponent
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
    providers: [FileInfoService, FileInfo, GitInfoService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
