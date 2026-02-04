import { Company } from "./company";

export interface Notification {
    _id: string;
    jobId: string | NotifJob;
    company: Company;
    date: Date;
    createdBy: string;
    actionType: 'created' | 'updated' | 'archived';
    sharedWith: NotifAssociation[];
    viewedBy: NotifAssociation[];
    viewed: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface NotifAssociation {
    _id: string;
    raisonSocial: string;
}

export interface NotifJob {
    _id: string;
    title: string;
    reference: string;
}

export interface NotificationResponse {
    notifications: Notification[];
    totalCount: number;
}

export interface UnreadCountResponse {
    count: number;
}