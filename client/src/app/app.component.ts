import { Component } from '@angular/core';
import { NgxMsgConfigService, NgxMsgPosition, NgxMsgService } from "ngx-msg";
import 'codemirror/mode/markdown/markdown';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    title: string = "Редактор текстовых файлов";

    constructor(private msgService: NgxMsgService, private configService: NgxMsgConfigService) {
        configService.position = NgxMsgPosition.TopRight;
        configService.visibleTime = 3000;
        configService.closeOnClick = false;
    };
}
