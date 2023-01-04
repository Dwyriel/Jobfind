import {Address} from "../interfaces/address";

export class User {
    email: string = "";
    password: string = "";
    name: string = "";
    telephone: string = "";
    address: Address = {cep: "", city: "", country: "", number: "", state: "", street: "",};
    academicFormation: {}[] = []; //TODO Academic Formation Interface
    jobExperiences: {}[] = []; //TODO Job Experience Interface
    skills: {}[] = []; //TODO Skill Enum
    languages: {}[] = []; //TODO Language Class
    links: string[] = ["", ""];
    curriculumRef: string = "";
    profilePictureRef: string = "";
    isActive: boolean = false;
}
