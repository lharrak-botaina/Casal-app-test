import { SocialMedia } from "./association";

export interface PersonContacted {
    fullname: string;
    _id: string;
    email: string;
    phone: string;
}

export interface Company {
    _id: string;
    name: string;
    address?: string;
    logo? : string;
    city?: string;
    activity_area?: string;
    email? : string;
    person_contacted?: PersonContacted;
    colaboration_type? : string;
    socialMedia?: SocialMedia;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}

export interface CompanyResult {
    _id : string,
    totalCount : number,
    companies : Company[]
}