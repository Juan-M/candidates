export enum Ranks {
    JUNIOR = 'junior',
    SENIOR = 'senior',
}

export interface Candidate {
    id: string;
    name: string;
    surname: string;
    seniority: Ranks;
    years: number;
    availability: boolean;
}
