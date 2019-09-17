import { CityDto } from './cityDto';

export interface EmployerDto {
    employerId: number;
    name: string;
    owner: string;
    description: string;
    phoneNumber: string;
    email: string;
    city: CityDto;
}
