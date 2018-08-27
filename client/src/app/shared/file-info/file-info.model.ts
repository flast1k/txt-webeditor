export class FileInfo {
    id: number;
    name: string;
    content: string;
    charset: string;

    constructor() {
        this.content = '';
        this.name = '';
        this.charset = '';
    }

}
