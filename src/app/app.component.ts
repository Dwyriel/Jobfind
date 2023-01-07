import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppUtilityService} from "./services/app-utility.service";
import {fromEvent, Observable, Subscription} from "rxjs";
import {AccountDBService} from "./services/account-db.service";
import {Account} from "./classes/app-utility";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    private windowResizeObservable?: Observable<Event>;
    private windowResizeSubscription?: Subscription;
    private authUserSubscription?: Subscription;
    private accountSubscription?: Subscription;

    constructor(private accountDBService: AccountDBService) {
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
        if (this.accountSubscription && !this.accountSubscription.closed)
            this.accountSubscription.unsubscribe();
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
        if (this.authUserSubscription && !this.authUserSubscription.closed)
            this.authUserSubscription.unsubscribe();
        this.authUserSubscription = this.accountDBService.GetUserObservable().subscribe(async user => {
            if (user) {
                await this.GetAccount(user.uid);
                return;
            }
            AppUtilityService.PushAccountInfo(null);
        });
    }

    async GetAccount(id: string) {
        if (this.accountSubscription && !this.accountSubscription.closed)
            this.accountSubscription.unsubscribe();
        this.accountSubscription = await this.accountDBService.GetAccountObservable(id).subscribe(async doc => {
            let account: Account | null = this.accountDBService.ConvertToProperClass(doc);
            if (!account.isActive)
                await this.accountDBService.Logout().then(success => {
                    if (success)
                        if (this.accountSubscription && !this.accountSubscription.closed)
                            this.accountSubscription.unsubscribe();
                    account = null;
                });
            AppUtilityService.PushAccountInfo(account);
        });
    }
}
