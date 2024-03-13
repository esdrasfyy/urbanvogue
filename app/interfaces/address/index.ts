export interface AddressI{
    address_id: number;
    user_id: number;
    street: string;
    number: number;
    cep: number;
    city: string ;
    state: string ;
    type_address: string;
    reference: null | string;
}