import { StateDto } from './stateDto';

export interface CityDto{
    cityId: number;
    name: string;
    state: StateDto;
}