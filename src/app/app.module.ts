import {
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule, MatSidenavModule, MatListModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CovalentFileModule } from '@covalent/core/file';
import { NgxMsgModule } from 'ngx-msg';
import { Routes, RouterModule } from '@angular/router';

import { FileInfoService } from './shared/file-info/file-info.service';
import { FileInfo } from "./shared/file-info/file-info.model";
import { AppComponent } from './app.component';
import { FileInfoListComponent } from './file-info-list/file-info-list.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUpdateComponent } from './file-update/file-update.component';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';

const appRoutes: Routes = [
    {path: '', component: FileUploadComponent},
    {path: 'history', component: FileInfoListComponent},
];

@NgModule({
    declarations: [
        AppComponent, FileInfoListComponent, FileInfoListComponent, FileUploadComponent, FileUpdateComponent, MenuComponent
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
        MatListModule
    ],
    providers: [FileInfoService, FileInfo],
    bootstrap: [AppComponent]
})
export class AppModule {
}
