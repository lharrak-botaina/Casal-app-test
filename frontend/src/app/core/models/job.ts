import { Company } from "./company";

export interface Job {
    _id: string;
    title: string; 
    reference : string;
    company: Company; 
    description: string; 
    location : string; 
    activity_area : string; 
    createdBy: string;
    status: string;
    type_contrat: string[];
    sharedWith: JobAssociation[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface JobAssociation {
  _id : string;
  raisonSocial : string;
}

export interface JobResult {
  _id: string;
  totalCount: number;
  jobs: Job[];
}
