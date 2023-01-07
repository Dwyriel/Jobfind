import {Candidate} from "./candidate";
import {Company} from "./company";

export class BrowserInfo {
    innerWidth: number = -1;
    innerHeight: number = -1;
    outerWidth: number = -1;
    outerHeight: number = -1;
    userAgent: string = "";
}

export class AppInfo{
    appTitle = "";
}

export type Account = Candidate | Company;
