import { ClientDto } from './clientDto';

export interface UserProfile {
    username: string;
    password: string;
    roles: string;
    person: ClientDto;
}
