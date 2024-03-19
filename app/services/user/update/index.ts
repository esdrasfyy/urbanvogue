interface UpdateUserApiProps{
    userId: number;
    gender: string;
    profile: string;
    password:string;
    fullname: string;
    username: string;
    email: string;
    phone: string;
    birthdate: Date;
    cpf: string;
}

function UpdateUserApi({birthdate, cpf, email, fullname, gender, password, phone, profile, userId, username}:UpdateUserApiProps) {
    

    return 
}

export {UpdateUserApi};