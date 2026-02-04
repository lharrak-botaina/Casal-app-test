import { Company } from "./company";

export interface Notification {
    _id: string;
    jobId : string;
    company: Company; 
    date: Date; 
    createdBy: string;
    sharedWith: NotifAssociation[];
    viewedBy: NotifAssociation[];
    viewed : boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface NotifAssociation {
  _id : string;
  raisonSocial : string;
}