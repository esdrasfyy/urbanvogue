export interface UserCardI {
    type:string;
    user_id: number;
    card_number:string;
    name_holder:string;
    cpf_holder: string;
    card_nickname:string;
    card_network:string;
    expiration_date: string;
    billing_address: string;
    cvv: string;
}