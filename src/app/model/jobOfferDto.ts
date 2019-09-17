import { EmployerDto } from './employerDto';
import { JobDto } from './jobDto';

export interface JobOfferDto{
    jobOfferId: number;
    description: string;
    tips: boolean;
    hourlyWage: number;
    overTime: boolean;
    fromDate: Date;
    toDate: Date;
    employer: EmployerDto;
    job: JobDto;

}
