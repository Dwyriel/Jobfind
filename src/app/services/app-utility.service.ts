import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {BrowserInfo, AppInfo} from "../classes/app-utility";

@Injectable({
    providedIn: 'root'
})
export class AppUtilityService {
    private static browserInfo = new BehaviorSubject<BrowserInfo>(new BrowserInfo());
    private static appInfo = new BehaviorSubject<AppInfo>(new AppInfo());//! Maybe this could be just the object, not an observable

    /**
     * Puts and pushes new information into browserInfo and notifies every listener.
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
     * Puts and pushes new information into appInfo and notifies every listener.
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
}
