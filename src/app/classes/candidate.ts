import {AccountType} from "../interfaces/account-related-interfaces";
import {Address, defaultAddress} from "../interfaces/address";

export class Candidate {
    accountType: AccountType = AccountType.User;
    contactEmail: string = "";
    name: string = "";
    telephone: string = "";
    address: Address = defaultAddress;
    academicFormation: {}[] = []; //TODO Academic Formation Interface
    jobExperiences: {}[] = []; //TODO Job Experience Interface
    skills: {}[] = []; //TODO Skill Enum
    languages: {}[] = []; //TODO Language Class
    links: string[] = [];
    curriculumRef: string = "";
    profilePictureRef: string = "";
    isActive: boolean = false;
}

export function UserToJSObject(candidate: Candidate) : any{
    return {
        accountType: AccountType[candidate.accountType],
        contactEmail: candidate.contactEmail,
        name: candidate.name,
        telephone: candidate.telephone,
        address: candidate.address,
        academicFormation: candidate.academicFormation,
        jobExperiences: candidate.jobExperiences,
        skills: candidate.skills,
        languages: candidate.languages,
        links: candidate.links,
        curriculumRef: candidate.curriculumRef,
        profilePictureRef: candidate.profilePictureRef,
        isActive: candidate.isActive,
    };
}

export function JSObjectToUser(object: any){
    let candidate: Candidate = new Candidate();
    candidate.accountType = AccountType[object.accountType as keyof typeof AccountType];
    candidate.contactEmail = object.contactEmail;
    candidate.name = object.name;
    candidate.telephone = object.telephone;
    candidate.address = object.address;
    candidate.academicFormation = object.academicFormation;
    candidate.jobExperiences = object.jobExperiences;
    candidate.skills = object.skills;
    candidate.languages = object.languages;
    candidate.links = object.links;
    candidate.curriculumRef = object.curriculumRef;
    candidate.profilePictureRef = object.profilePictureRef;
    candidate.isActive = object.isActive;
    return candidate;
}
