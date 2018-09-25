import { Component, OnInit } from '@angular/core';
import { IUploadOptions, TdFileService } from '@covalent/core/file';
import { NgxMsgLevel, NgxMsgService } from 'ngx-msg';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AppSettings } from "../shared/app-settings";

const UPLOAD_URL = 'files/upload';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
    file: File;
    disabled: boolean;
    firstFormGroup: FormGroup;
    formData: FormData;

    constructor(private fileUploadService: TdFileService, private msgService: NgxMsgService, private _formBuilder: FormBuilder, private router: Router) {
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
                localStorage.setItem(AppSettings.CURRENT_FILEINFO, success);
                this.router.navigateByUrl(AppSettings.EDIT_URL);
            },
            error => {
                this.disabled = false;
                this.msgService.message({level: NgxMsgLevel.Error, text: 'Ошибка при загрузке: ' + error.statusText});
            });
    }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            selectCtrl: ['', Validators.required]
        });
    }

}
