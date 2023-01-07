import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppUtilityService} from "./services/app-utility.service";
import {fromEvent, Observable, Subscription} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    private windowResizeObservable?: Observable<Event>;
    private windowResizeSubscription?: Subscription;
    private authUserSubscription?: Subscription;

    constructor() {
    }

    async ngOnInit() {
        this.SetInitializationParameters();
        await this.verifyUser();
    }

    ngOnDestroy() {
        if (this.windowResizeSubscription && !this.windowResizeSubscription.closed)
            this.windowResizeSubscription.unsubscribe();
        if (this.authUserSubscription && !this.authUserSubscription.closed)
            this.authUserSubscription.unsubscribe();
    }

    private SetInitializationParameters() {
        AppUtilityService.PushAppInfo({appTitle: "jobfind"});
        this.PushBrowserInfo();
        if (this.windowResizeSubscription && !this.windowResizeSubscription.closed)
            this.windowResizeSubscription.unsubscribe();
        this.windowResizeObservable = fromEvent(window, 'resize');
        this.windowResizeSubscription = this.windowResizeObservable.subscribe(() => this.PushBrowserInfo());
    }

    private PushBrowserInfo() {
        AppUtilityService.PushBrowserInfo({
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight,
            userAgent: navigator.userAgent
        });
    }

    private verifyUser() {

    }
}
