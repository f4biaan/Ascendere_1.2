type userRol = 'estudiante' | 'tutor';

export interface User{
    id?: string;
    mail: string;
    givenName: string;
    surname: string;
    displayName: string;
    photo_url?: string;
    role: userRol;
}
