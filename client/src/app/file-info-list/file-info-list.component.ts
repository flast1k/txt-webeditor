import { Component, OnInit } from '@angular/core';
import { FileInfoService } from '../shared/file-info/file-info.service';
import { FileInfo } from '../shared/file-info/file-info.model';
import { AppSettings } from "../shared/app-settings";
import { Router } from "@angular/router";

const DOWNLOAD_LINK = 'files/download';

@Component({
    selector: 'app-file-info-list',
    templateUrl: './file-info-list.component.html',
    styleUrls: ['./file-info-list.component.css']
})
export class FileInfoListComponent implements OnInit {
    displayedColumns: string[] = ['name', 'action', 'content'];
    filesInfo: Array<FileInfo>;

    constructor(private fileInfoService: FileInfoService, private router: Router) {
    }

    ngOnInit() {
        this.fileInfoService.getAll().subscribe(data => {
            this.filesInfo = data;
        });
    }

    generateLinkToFile(id: number) {
        return `${DOWNLOAD_LINK}/${id}`;
    }

    editFileInfo(fileInfo: FileInfo) {
        localStorage.setItem(AppSettings.CURRENT_FILEINFO, JSON.stringify(fileInfo));
        this.router.navigateByUrl(AppSettings.EDIT_URL);
    }

}
