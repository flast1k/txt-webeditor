import { MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule, MatTableModule, MatIconModule, } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CovalentFileModule } from '@covalent/core/file';
import { NgxMsgModule } from 'ngx-msg';

import { FileInfoService } from './shared/file-info/file-info.service';
import { FileInfo } from "./shared/file-info/file-info.model";
import { AppComponent } from './app.component';
import { FileInfoListComponent } from './file-info-list/file-info-list.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUpdateComponent } from './file-update/file-update.component';


@NgModule({
  declarations: [
    AppComponent, FileInfoListComponent, FileInfoListComponent, FileUploadComponent, FileUpdateComponent
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
  ],
  providers: [FileInfoService, FileInfo],
  bootstrap: [AppComponent]
})
export class AppModule {
}
