import {Address} from "./address";

export class Joblisting {
    title: string = "";
    body:string = "";
    requiredSkills: {}[] = [];
    salaryRange: {} = {}; //TODO object
    contractType: string = ""; //TODO enum
    regimeType: string = ""; //TODO enum
    address: Address = new Address();
    expired: boolean = false;
    isActive: boolean = false;
}
