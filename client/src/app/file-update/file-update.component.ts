import {Component, Input} from '@angular/core';
import {FileInfo} from "../shared/file-info/file-info.model";
import {FileInfoService} from "../shared/file-info/file-info.service";
import {NgxMsgLevel, NgxMsgService} from "ngx-msg";

@Component({
  selector: 'app-file-update',
  templateUrl: './file-update.component.html',
  styleUrls: ['./file-update.component.css']
})
export class FileUpdateComponent {
  @Input()
  fileInfo: FileInfo;

  constructor(private fileInfoService: FileInfoService, private msgService: NgxMsgService) {
  }

  onSubmit(fileInfo) {
    this.fileInfoService.update(fileInfo).subscribe(
      (data: FileInfo) => {
        this.fileInfo = data;
        this.msgService.message({level: NgxMsgLevel.Success, text: 'Успешно обновлено'});
        },
      error => {
        this.msgService.message({level: NgxMsgLevel.Error, text: 'Ошибка при загрузке: ' + error});
      }
    );
  }

  proceed(): void {
    this.fileInfoService.download();
  }
}
