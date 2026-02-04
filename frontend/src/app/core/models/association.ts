export interface SocialMedia {
    _id: string;
    facebook: string;
    instagram: string;
    linkedIn: string;
    twitter: string;
}

export interface Tip {
    _id: string;
    fullname: string;
    email: string;
    phone: string;
    photo: string;
}

export interface Association {
    _id: string;
    raisonSocial: string;
    name: string;
    email: string;
    address: string;
    city: string;
    webSite: string;
    socialMedia: SocialMedia;
    description: string;
    logo: string;
    tip: Tip;
    collaborationDate: Date;
    creationDate: Date;
    userId : string,
    createdAt: Date;
    updatedAt: Date;
    __v? : string
}

export interface AssociationResult {
    _id : string,
    totalCount : number,
    associations : Association[]
}