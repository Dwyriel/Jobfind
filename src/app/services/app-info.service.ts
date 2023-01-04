import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {AppInfo} from "../classes/app-info";

@Injectable({
    providedIn: 'root'
})
export class AppInfoService {
    private static appInfo = new BehaviorSubject<AppInfo>(new AppInfo());

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
    static GetAppInfoObservable(): Observable<AppInfo> {
        return this.appInfo.asObservable();
    }

    /**
     * @returns the current value of the appInfo object.
     */
    static GetAppInfo(): AppInfo {
        return this.appInfo.value;
    }
}
