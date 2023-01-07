import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {BrowserInfo, AppInfo, Account} from "../classes/app-utility";
import {Candidate} from "../classes/candidate";
import {Company} from "../classes/company";

@Injectable({
    providedIn: 'root'
})
export class AppUtilityService {
    private static browserInfo = new BehaviorSubject<BrowserInfo>(new BrowserInfo());
    private static accountInfo = new BehaviorSubject<Account | null>(null);
    private static appInfo = new BehaviorSubject<AppInfo>(new AppInfo());//! Maybe this could be just the object, not an observable

    /**
     * Pushes new information into browserInfo and notifies every listener.
     * @param browserInfo the new information for browserInfo.
     */
    public static PushBrowserInfo(browserInfo: BrowserInfo) {
        this.browserInfo.next(browserInfo);
    }

    /**
     * @returns an observable for the browserInfo object.
     */
    public static GetBrowserInfoObservable(): Observable<BrowserInfo> {
        return this.browserInfo.asObservable();
    }

    /**
     * @returns the current value of the browserInfo object.
     */
    public static GetBrowserInfo(): BrowserInfo {
        return this.browserInfo.value;
    }

    /**
     * Pushes new information into appInfo and notifies every listener.
     * @param appInfo the new information for appInfo.
     */
    public static PushAppInfo(appInfo: AppInfo) {
        this.appInfo.next(appInfo);
    }

    /**
     * @returns an observable for the appInfo object.
     */
    public static GetAppInfoObservable(): Observable<AppInfo> {
        return this.appInfo.asObservable();
    }

    /**
     * @returns the current value of the appInfo object.
     */
    public static GetAppInfo(): AppInfo {
        return this.appInfo.value;
    }

    /**
     * Pushes new information into accountInfo and notifies every listener.
     * @param accountInfo the new information for accountInfo.
     */
    public static PushAccountInfo(accountInfo: Account | null) {
        this.accountInfo.next(accountInfo);
    }

    /**
     * @returns an observable for the accountInfo object.
     */
    public static GetAccountInfoObservable(): Observable<Account | null> {
        return this.accountInfo.asObservable();
    }

    /**
     * @returns the current value of the accountInfo object.
     */
    public static GetAccountInfo(): Account | null {
        return this.accountInfo.value;
    }
}
