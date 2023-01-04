import {Address} from "./address";

export class Company {
    companyName: string = "";
    address: Address = new Address();
    telephone: string = "";
    website: string = "";
    contactEmail: string = "";
    legalInfo: string = "";
    companySize: string = ""; //TODO company size enum
    profilePictureRef: string = "";
    isActive: boolean = false;
}
