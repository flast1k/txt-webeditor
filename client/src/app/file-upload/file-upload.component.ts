import { Component} from '@angular/core';
import { TdFileService, IUploadOptions } from '@covalent/core/file';
import {NgxMsgLevel, NgxMsgService} from 'ngx-msg';
import {FileInfo} from "../shared/file-info/file-info.model";

const URL = 'files/upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent {
  file: File;
  disabled: boolean;
  fileInfo: FileInfo;

  constructor(private fileUploadService: TdFileService, private msgService: NgxMsgService) {
    this.disabled = false;
  };

  uploadEvent(file: File) {
    this.disabled = true;
    let options: IUploadOptions = {
      url: URL,
      method: 'post',
      file: file,
    };
    this.fileUploadService.upload(options).subscribe(success => {
        this.disabled = false;
        this.msgService.message({level: NgxMsgLevel.Success, text: 'Успешно загружено'});
        this.fileInfo = JSON.parse(success);
      },
      error => {
        this.disabled = false;
        this.msgService.message({level: NgxMsgLevel.Error, text: 'Ошибка при загрузке: ' + error});
        this.fileInfo = undefined;
      });
  };

}
