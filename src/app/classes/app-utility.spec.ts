import {AppInfo, BrowserInfo} from './app-utility';

describe('BrowserInfo', () => {
    it('should create an instance', () => {
        expect(new BrowserInfo()).toBeTruthy();
    });
});

describe('AppInfo', () => {
    it('should create an instance', () => {
        expect(new AppInfo()).toBeTruthy();
    });
});
