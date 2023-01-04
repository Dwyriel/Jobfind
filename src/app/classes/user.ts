import {Address} from "./address";

export class User {
    contactEmail: string = "";
    name: string = "";
    telephone: string = "";
    address: Address = new Address();
    academicFormation: {}[] = []; //TODO Academic Formation Interface
    jobExperiences: {}[] = []; //TODO Job Experience Interface
    skills: {}[] = []; //TODO Skill Enum
    languages: {}[] = []; //TODO Language Class
    links: string[] = ["", ""];
    curriculumRef: string = "";
    profilePictureRef: string = "";
    isActive: boolean = false;
}
