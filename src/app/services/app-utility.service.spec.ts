import {TestBed} from '@angular/core/testing';

import {AppUtilityService} from './app-utility.service';

describe('AppInfoService', () => {
    let service: AppUtilityService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AppUtilityService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
