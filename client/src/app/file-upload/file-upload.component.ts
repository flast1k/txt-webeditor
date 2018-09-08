import { Component, OnInit } from '@angular/core';
import { IUploadOptions, TdFileService } from '@covalent/core/file';
import { NgxMsgLevel, NgxMsgService } from 'ngx-msg';
import { FileInfo } from '../shared/file-info/file-info.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const UPLOAD_URL = 'files/upload';
const NEW_FILE_NAME = 'Newfile.txt';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
    file: File;
    disabled: boolean;
    fileInfo: FileInfo;
    selectedCharset: string;
    firstFormGroup: FormGroup;
    formData: FormData;

    constructor(private fileUploadService: TdFileService, private msgService: NgxMsgService, private _formBuilder: FormBuilder) {
        this.disabled = false;
    }

    uploadEvent(file: File) {
        this.formData = new FormData();
        this.formData.append('file', file);
        this.disabled = true;
        const options: IUploadOptions = {
            url: UPLOAD_URL,
            method: 'post',
            formData: this.formData,
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
    }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            selectCtrl: ['', Validators.required]
        });
    }

    createNewFileInfo() {
        this.fileInfo = new FileInfo();
        this.fileInfo.name = NEW_FILE_NAME;
        this.fileInfo.charset = this.selectedCharset;
    }

}
