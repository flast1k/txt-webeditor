import { Component, OnInit } from '@angular/core';
import { FileInfoService } from '../shared/file-info/file-info.service';
import { FileInfo } from "../shared/file-info/file-info.model";

@Component({
  selector: 'app-file-info-list',
  templateUrl: './file-info-list.component.html',
  styleUrls: ['./file-info-list.component.css']
})
export class FileInfoListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'content'];
  filesInfo: Array<FileInfo>;
  constructor(private fileInfoService: FileInfoService) { }

  ngOnInit() {
    this.fileInfoService.getAll().subscribe(data => {
      this.filesInfo = data;
    });
  }

}
