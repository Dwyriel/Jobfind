import {AccountType} from "../interfaces/account-related-interfaces";
import {Address, defaultAddress} from "../interfaces/address";

export class User {
    accountType: AccountType = AccountType.User;
    contactEmail: string = "";
    name: string = "";
    telephone: string = "";
    address: Address = defaultAddress;
    academicFormation: {}[] = []; //TODO Academic Formation Interface
    jobExperiences: {}[] = []; //TODO Job Experience Interface
    skills: {}[] = []; //TODO Skill Enum
    languages: {}[] = []; //TODO Language Class
    links: string[] = ["", ""];
    curriculumRef: string = "";
    profilePictureRef: string = "";
    isActive: boolean = false;
}

export function UserToJSObject(user: User) : any{
    return {
        accountType: AccountType[user.accountType],
        contactEmail: user.contactEmail,
        name: user.name,
        telephone: user.telephone,
        address: user.address,
        academicFormation: user.academicFormation,
        jobExperiences: user.jobExperiences,
        skills: user.skills,
        languages: user.languages,
        links: user.links,
        curriculumRef: user.curriculumRef,
        profilePictureRef: user.profilePictureRef,
        isActive: user.isActive,
    };
}

export function JSObjectToUser(object: any){
    let user: User = new User();
    user.accountType = AccountType[object.accountType as keyof typeof AccountType];
    user.contactEmail = object.contactEmail;
    user.name = object.name;
    user.telephone = object.telephone;
    user.address = object.address;
    user.academicFormation = object.academicFormation;
    user.jobExperiences = object.jobExperiences;
    user.skills = object.skills;
    user.languages = object.languages;
    user.links = object.links;
    user.curriculumRef = object.curriculumRef;
    user.profilePictureRef = object.profilePictureRef;
    user.isActive = object.isActive;
    return user;
}
