import {TestBed} from '@angular/core/testing';

import {AccountDBService} from './account-db.service';

describe('UserDBService', () => {
    let service: AccountDBService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AccountDBService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
