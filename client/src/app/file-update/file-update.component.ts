import { Component, Input } from '@angular/core';
import { FileInfo } from "../shared/file-info/file-info.model";
import { FileInfoService } from "../shared/file-info/file-info.service";
import { NgxMsgLevel, NgxMsgService } from "ngx-msg";
import { saveAs } from 'file-saver/FileSaver';

@Component({
    selector: 'app-file-update',
    templateUrl: './file-update.component.html',
    styleUrls: ['./file-update.component.css']
})
export class FileUpdateComponent {
    @Input()
    fileInfo: FileInfo;

    static getFileNameFromHeader(header:string): string {
        let filename = '';
        let pattern = 'filename="(.*?)"';
        let match = header.match(pattern);
        if (match.length > 0){
            filename = match[1];
        }
        return filename;
    }

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

    proceed(fileInfo) {
        this.fileInfoService.download(fileInfo).subscribe(
            success => {
                let filename = FileUpdateComponent.getFileNameFromHeader(success.headers.get('Content-Disposition'));
                saveAs(success.body, filename);
            },
            error => {
                this.msgService.message({level: NgxMsgLevel.Error, text: 'Ошибка при загрузке: ' + error});
            }
        );
    }
}
