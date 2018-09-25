import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FileInfo } from '../shared/file-info/file-info.model';
import { FileInfoService } from '../shared/file-info/file-info.service';
import { NgxMsgLevel, NgxMsgService } from 'ngx-msg';
import { saveAs } from 'file-saver/FileSaver';
import { Charset } from '../shared/charset/charset';
import { CharsetService } from '../shared/charset/charset.service';
import { AppSettings } from "../shared/app-settings";

@Component({
    selector: 'app-file-update',
    templateUrl: './file-update.component.html',
    styleUrls: ['./file-update.component.css']
})
export class FileUpdateComponent implements OnInit, OnDestroy{
    // @Input()
    fileInfo: FileInfo;
    charsets: Charset[];

    static getFileNameFromHeader(header: string): string {
        let filename = '';
        const pattern = 'filename="(.*?)"';
        const match = header.match(pattern);
        if (match.length > 0) {
            filename = match[1];
        }
        return filename;
    }

    constructor(private fileInfoService: FileInfoService, private msgService: NgxMsgService, private charsetService: CharsetService) {
        this.getAllCharsets();
    }

    getAllCharsets() {
        this.charsetService.getAll().subscribe(
            (data: Charset[]) => {
                this.charsets = data;
            },
            error => {
                this.msgService.message({level: NgxMsgLevel.Error, text: 'Ошибка при загрузке кодировок: ' + error});
            });
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
                const filename = FileUpdateComponent.getFileNameFromHeader(success.headers.get('Content-Disposition'));
                saveAs(success.body, filename);
            },
            error => {
                this.msgService.message({level: NgxMsgLevel.Error, text: 'Ошибка при загрузке: ' + error});
            }
        );
    }

    ngOnInit(): void {
        this.fileInfo = JSON.parse(localStorage.getItem(AppSettings.CURRENT_FILEINFO));
    }

    ngOnDestroy(): void {
        localStorage.removeItem(AppSettings.CURRENT_FILEINFO);
    }

}
