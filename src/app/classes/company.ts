import {Address, defaultAddress} from "../interfaces/address";
import {AccountType} from "../interfaces/account-related-interfaces";

export class Company {
    accountType: AccountType = AccountType.Company;
    companyName: string = "";
    address: Address = defaultAddress;
    telephone: string = "";
    website: string = "";
    contactEmail: string = "";
    legalInfo: string = "";
    companySize: string = ""; //TODO company size enum
    profilePictureRef: string = "";
    isActive: boolean = false;
}

export function CompanyToJSObject(company: Company) : any{
    return {
        accountType: AccountType[company.accountType],
        companyName: company.companyName,
        address: company.address,
        telephone: company.telephone,
        website: company.website,
        contactEmail: company.contactEmail,
        legalInfo: company.legalInfo,
        companySize: company.companySize,
        profilePictureRef: company.profilePictureRef,
        isActive: company.isActive
    };
}

export function JSObjectToUser(object: any){
    let company: Company = new Company();
    company.accountType = AccountType[object.accountType as keyof typeof AccountType];
    company.companyName = object.companyName;
    company.address = object.address;
    company.telephone = object.telephone;
    company.website = object.website;
    company.contactEmail = object.contactEmail;
    company.legalInfo = object.legalInfo;
    company.companySize = object.companySize;
    company.profilePictureRef = object.profilePictureRef;
    company.isActive = object.isActive;
    return company;
}

