import { BooleanInput } from "@angular/cdk/coercion";
import { Passwork } from "./passwork";

export interface Addiction {
    status: boolean;
    description: string;
}

export interface Handicap {
    status: boolean;
    description: string;
}

export interface HealthIssue {
    status: boolean;
    chronic_illness: string;
    ongoing_treatment: string;
}

export interface PhysicalState {
    addiction: Addiction;
    handicap: Handicap;
    health_issue: HealthIssue;
}

export interface PersonalInfo {
    fullname: string;
    address: string;
    city: string;
    gendre: string;
    birth_date: Date;
    inscription_date: Date;
    photo?: string;
    phone: string;
    cin_id: string;
    cnss_id: string;
    nationality: string;
    nationality_comment: string;
    civil_status: string;
    kids_nbr: number;
    housing: string;
    people_in_charge_nbr: number;
    current_function: string;
    associative_activity: string;
    hobbies: string[];
    connectedBy: string;
    isPriority: boolean;
    physical_state: PhysicalState;
    identifier? : string,
    rate? : number
}

/////////////Bilan de compétance

export interface LevelOfStudy {
    level: string;
    description: string;
}

export interface ProfessionalTraining {
    type_formation: string;
    specialty: string;
    institution: string;
    start_date: string;
    end_date: string;
    cetificate: string;
    comment: string;
}

export interface ProfessionalExperience {
    genre: string;
    institution: string;
    start_date: string;
    end_date: string;
    duration: string;
    function: string;
    comment: string;
}

export interface TipInterview {
    date: string;
    comment: string;
}

export interface Skills {
    hard_skills: string[];
    soft_skills: string[];
    life_skills: string[];
}

export interface SkillsAssessment {
    level_of_study: LevelOfStudy;
    languages: string[];
    languages_comment: string;
    professional_training: ProfessionalTraining[];
    professional_experience: ProfessionalExperience[];
    tip_interview: TipInterview;
    skills: Skills;
    rate? : number
}

export interface Training {
    title: string;
    start_date: Date;
    status: string;
}

export interface CapacityBuilding {
    training: Training[];
    comment: string;
    rate? : number
}

export interface PassworkTraining {
    passwork_training: Passwork | any;
    start_date: Date;
    end_date: Date;
    comment: string;
}

export interface Passwork_Details {
    trainings : PassworkTraining[];
    rate? : number
}

export interface TrackingBefore {
    interview_date: Date;
    companyId: string;
    job_position: string;
    comment: string;
}

export interface TrackingAfter {
    contract_type: string;
    companyId: string;
    start_date: Date;
    end_date: Date;
    category: string;
    function_type: string;
    duration: string;
    cnss: boolean;
    salary: string;
    function: string;
    insertion_type: string;
    justificative_type?: string;
    justification?: string;
}

export interface InsertionList {
    tracking_before: TrackingBefore[];
    tracking_after: TrackingAfter;
}

export interface Insertion {
    list : InsertionList[];
    rate? : number
}

export interface Young {
    _id? : string,
    personal_info : PersonalInfo,
    skills_assessment : SkillsAssessment;
    capacity_building : CapacityBuilding;
    passwork : Passwork_Details;
    insertion : Insertion;
    status? : Boolean,
    createdAt? : Date,
    updatedAt? : Date,
    createdBy? : string,
    associationName?: string,
    navigationId? : number
    __v? : string
}

export interface YoungResult {
    _id : string,
    totalCount : number,
    youth : Young[]
}