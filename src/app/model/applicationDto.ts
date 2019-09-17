import { ClientDto } from './clientDto';
import { JobOfferDto } from './jobOfferDto';

export interface ApplicationDto{
    applicationId: number;
    date: Date;
    client: ClientDto;
    jobOffer: JobOfferDto;

}
