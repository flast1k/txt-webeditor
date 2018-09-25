import { Component, OnInit } from '@angular/core';
import { FileInfo } from "../shared/file-info/file-info.model";
import { Router } from "@angular/router";
import { AppSettings } from "../shared/app-settings";

const NEW_FILE_NAME = 'Newfile.txt';
const NEW_FILE_CHARSET = 'UTF-8';

@Component({
    selector: 'app-file-create',
    templateUrl: './file-create.component.html',
    styleUrls: ['./file-create.component.css']
})
export class FileCreateComponent implements OnInit {
    fileInfo: FileInfo;

    constructor(private route: Router) {
        this.createNewFileInfo();
        localStorage.setItem(AppSettings.CURRENT_FILEINFO, JSON.stringify(this.fileInfo));
        this.route.navigateByUrl(AppSettings.EDIT_URL);
    }

    ngOnInit() {
    }

    createNewFileInfo() {
        this.fileInfo = new FileInfo();
        this.fileInfo.name = NEW_FILE_NAME;
        this.fileInfo.charset = NEW_FILE_CHARSET;
    }

}
