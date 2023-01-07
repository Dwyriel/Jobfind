import {Address, defaultAddress} from "../interfaces/address";
import {AccountType, CompanySize} from "../interfaces/account-related-interfaces";

export class Company {
    accountType: AccountType = AccountType.Company;
    companyName: string = "";
    address: Address = defaultAddress;
    telephone: string = "";
    website: string = "";
    contactEmail: string = "";
    legalInfo: string = "";
    companySize: CompanySize = CompanySize.Small;
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
        companySize: CompanySize[company.companySize],
        profilePictureRef: company.profilePictureRef,
        isActive: company.isActive
    };
}

export function JSObjectToCompany(object: any){
    let company: Company = new Company();
    company.accountType = AccountType[object.accountType as keyof typeof AccountType];
    company.companyName = object.companyName;
    company.address = object.address;
    company.telephone = object.telephone;
    company.website = object.website;
    company.contactEmail = object.contactEmail;
    company.legalInfo = object.legalInfo;
    company.companySize = CompanySize[object.companySize as keyof typeof CompanySize];
    company.profilePictureRef = object.profilePictureRef;
    company.isActive = object.isActive;
    return company;
}

