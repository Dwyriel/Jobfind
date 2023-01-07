import {Address, defaultAddress} from "../interfaces/address";

export class Joblisting {
    title: string = "";
    body: string = "";
    requiredSkills: {}[] = [];
    salaryRange: {} = {}; //TODO object
    contractType: string = ""; //TODO enum
    regimeType: string = ""; //TODO enum
    address: Address = defaultAddress;
    expired: boolean = false;
    isActive: boolean = false;
}
