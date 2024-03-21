export interface AddressDeleteApiProps{
    user_id:number;
    address_id:number;
}
export interface AddressDeleteApiReq{
    msg?:string | null;
    status?:number | null;
}
export interface AddressDeleteApiResponse{
    data: AddressDeleteApiReq;
    status: number;
    error:string | null;
}
