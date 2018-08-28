import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GitInfoService} from "../shared/git-info/git-info.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
    version: string;

    constructor(private http: HttpClient, private gitInfoService: GitInfoService) {
    }

    ngOnInit() {
        this.gitInfoService.getVersion().subscribe(data => this.version = data);
    }

}
