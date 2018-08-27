import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileInfo } from './file-info.model';

const UPDATE_URL = 'files/update';
const GET_HISTORY_URL = 'files/getFileInfoHistory';
const DOWNLOAD_URL = 'files/download';


@Injectable()
export class FileInfoService {
    constructor(private http: HttpClient) {
    }

    update(fileInfo: FileInfo): Observable<FileInfo> {
        return this.http.post<FileInfo>(UPDATE_URL, fileInfo);
    }

    getAll(): Observable<FileInfo[]> {
        return this.http.get<FileInfo[]>(GET_HISTORY_URL);
    }

    download(fileInfo: FileInfo) {
        return this.http.post(DOWNLOAD_URL, fileInfo, {  responseType: 'blob', observe: 'response' });
    }
}
