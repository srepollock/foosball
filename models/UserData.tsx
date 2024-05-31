export type UserData = {
    id: string;
    created_at: string;
    given_name: string;
    sur_name: string;
    full_name?: string;
};

export const DefaultUserData: UserData = {
    id: '',
    created_at: new Date().toISOString(),
    given_name: '',
    sur_name: '',
    full_name: '',
};

export type UserIdFullNameData = {
    id: string;
    full_name: string;
};
