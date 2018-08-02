import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileInfo } from './file-info.model';

const UPDATE_URL = 'http://localhost:8080/webeditor/files/update';
const GET_HISTORY_URL = 'http://localhost:8080/webeditor/files/getFileInfoHistory';
const DOWNLOAD_URL = 'http://localhost:8080/webeditor/files/download';


@Injectable()
export class FileInfoService {
  constructor(private http: HttpClient) {
  }

  update(fileInfo: FileInfo): Observable<FileInfo>{
    return this.http.post<FileInfo>(UPDATE_URL, fileInfo);
  }

  getAll(): Observable<FileInfo[]> {
    return this.http.get<FileInfo[]>(GET_HISTORY_URL);
  }

  download(): void {
    let form = document.createElement('form');
    form.setAttribute('method', 'get');
    form.setAttribute('action', DOWNLOAD_URL);
    form.style.display = 'hidden';
    document.body.appendChild(form);
    form.submit();
  }
}
