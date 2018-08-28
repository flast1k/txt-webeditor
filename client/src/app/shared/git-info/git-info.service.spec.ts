import {inject, TestBed} from '@angular/core/testing';

import {GitInfoService} from './git-info.service';

describe('GitInfoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitInfoService]
        });
    });

    it('should be created', inject([GitInfoService], (service: GitInfoService) => {
        expect(service).toBeTruthy();
    }));
});
