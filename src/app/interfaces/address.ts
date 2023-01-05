export interface Address {
    country: string;
    state: string;
    city: string;
    cep: string;
    street: string;
    number: string;
}

export const defaultAddress: Address = {street: "", state: "", number: "", country: "", city: "", cep: ""};
